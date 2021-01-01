declare var require: any
import * as db from './db';
import config from '../config/config';
import cache from './cache';
const {Extra} = require('telegraf');

/**
 * Forward video files to staff.
 * @param {string} type document, photo, video.
 * @param {bot} bot Bot object.
 * @param {context} ctx Bot context.
 */
function fileHandler(type, bot, ctx) {
  // replying to non-ticket
  let userid;
  let replyText;
  if (ctx.message !== undefined &&
    ctx.message.reply_to_message !== undefined && ctx.session.admin) {
    replyText = ctx.message.reply_to_message.text;
    if (replyText === undefined) {
      replyText = ctx.message.reply_to_message.caption;
    }
    userid = replyText.match(new RegExp('#T' +
          '(.*)' + ' ' + config.language.from));
    if (userid === null || userid === undefined) {
      userid = replyText.match(new RegExp('#T' +
            '(.*)' + '\n' + config.language.from));
    }
  }
  forwardFile(bot, ctx, function(userInfo) {
    let receiverId = config.staffchat_id;
    let msgId = ctx.message.chat.id;
    // if admin
    if (ctx.session.admin && userInfo === undefined) {
      msgId = userid[1];
    }
    db.getOpen(msgId, ctx.session.groupCategory, function(ticket) {
            let captionText = config.language.ticket +
        ' #T' +
        ticket.id.toString().padStart(6, '0') +
        ' ' +
        userInfo +
        '\n' +
        (ctx.message.caption || '');
      if (ctx.session.admin && userInfo === undefined) {
        receiverId = ticket.userid;
        captionText = (ctx.message.caption || '');
      }
      switch (type) {
        case 'document':
          bot.telegram.sendDocument(
              receiverId,
              ctx.message.document.file_id, {
                caption: captionText,
              }
          );
          if (ctx.session.group !== undefined && ctx.session.group !== config.staffchat_id) {
            bot.telegram.sendDocument(
                ctx.session.group,
                ctx.message.document.file_id, {
                  caption: captionText,
                }
            );
          }
          break;
        case 'photo':
          bot.telegram.sendPhoto(receiverId, ctx.message.photo[0].file_id, {
            caption: captionText,
          });
          if (ctx.session.group !== undefined && ctx.session.group !== config.staffchat_id) {
            bot.telegram.sendPhoto(ctx.session.group,
                ctx.message.photo[0].file_id, {
                  caption: captionText,
                });
          }
          break;
        case 'video':
          bot.telegram.sendVideo(receiverId, ctx.message.video.file_id, {
            caption: captionText,
          });
          if (ctx.session.group !== undefined && ctx.session.group !== config.staffchat_id) {
            bot.telegram.sendVideo(ctx.session.group,
                ctx.message.video.file_id, {
                  caption: captionText,
                });
          }
          break;
      }
    });
  });
}

/**
 * Handle caching for sent files.
 * @param {bot} bot Bot object.
 * @param {context} ctx Bot context.
 * @param {callback} callback Bot callback.
 */
function forwardFile(bot, ctx, callback) {
  db.getOpen(ctx.message.from.id, ctx.session.groupCategory, function(ticket) {
        let ok = false;
    if (ticket == undefined || ticket.status == undefined ||
          ticket.status == 'closed') {
      db.add(ctx.message.from.id, 'open', undefined);
      ok = true;
    }
    if (ok || ticket !== undefined && ticket.status !== 'banned') {
      if (cache.ticketSent[cache.ticketID] === undefined) {
        fowardHandler(ctx, function(userInfo) {
          callback(userInfo);
        });
        // wait 5 minutes before this message appears again and do not
        // send notificatoin sounds in that time to avoid spam
        setTimeout(function() {
          cache.ticketSent[cache.ticketID] = undefined;
        }, config.spam_time);
        cache.ticketSent[cache.ticketID] = 0;
      } else if (cache.ticketSent[cache.ticketID] < 5) {
        cache.ticketSent[cache.ticketID]++;
        // TODO: add Extra.HTML().notifications(false)
        // property for silent notifications
        fowardHandler(ctx, function(userInfo) {
          callback(userInfo);
        });
      } else if (cache.ticketSent[cache.ticketID] === 5) {
        cache.ticketSent[cache.ticketID]++;
        bot.telegram.sendMessage(ctx.chat.id,
            // eslint-disable-next-line new-cap
            config.language.blockedSpam, Extra.HTML());
      }
    }
  });
}

/**
 * Check if msg comes from user or admin.
 * @param {context} ctx Bot context.
 * @param {callback} callback Bot callback.
 */
function fowardHandler(ctx, callback) {
  let userInfo;
  ctx.getChat().then(function(chat) {
    if (chat.type === 'private') {
      cache.ticketID = ctx.message.from.id;
      userInfo =
          `${config.language.from} ${ctx.message.from.first_name} ` +
          `${config.language.language}: ` +
          `${ctx.message.from.language_code}\n\n`;

      if (ctx.session.group === undefined) {
        userInfo =
              `${config.language.from} ${ctx.message.from.first_name} ` +
              `@${ctx.message.from.username} ` +
              `${config.language.language}: ` +
              `${ctx.message.from.language_code}\n\n`;
      }
      callback(userInfo);
    } else {
      callback();
    }
  });
}

export {
  fileHandler,
  forwardFile,
  fowardHandler,
};
