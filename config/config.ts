const config = {
  // bot settings
  bot_token: '1445612326:AAH77Vmt3XyBJH0tx0SVbx4T7FgOen9cm-g', // support bot token
  staffchat_id: '-1001175897775', // eg. -123456789
  owner_id: '210012681',
  spam_time: 5 * 60 * 1000, // time (in MS) in which user may send 5 messages
  allow_private: false, // Allow / disallow option for staff to chat privately
  auto_close_tickets: true,

  // customize your language
  language: {
    startCommandText: 'Добро пожаловать в наш чат поддержки! Задайте здесь свой вопрос.',
    faqCommandText: 'Этот бот доступен по ссылке: <a href=\'https://github.com/bostrot/telegram-support-bot\'>github.com</a>',
    helpCommandText: '<b>Доступные команды:</b>\n/help\n/faq\n/id',
    contactMessage: 'Спасибо что связались с нами. Мы ответим как можно скорее.',
    blockedSpam: 'Вы отправили слишком много сообщений. Пожалуйста, дождитесь, пока наши сотрудники рассмотрят их.',
    ticket: 'Тикет',
    closed: 'закрыт',
    acceptedBy: 'был принят сотрудником',
    dear: 'Дорогой (-ая)',
    regards: 'С наилучшими пожеланиями,',
    from: 'от',
    language: 'Язык',
    msg_sent: 'Письмо от пользователя',
    usr_with_ticket: 'Пользователь с тикетом',
    banned: 'заблокирован',
    replyPrivate: 'Ответить в личном сообщении',
    services: 'Выберите сервис из списка ниже',
    customer: 'клиент',
    msgForwarding: 'Ваши сообщения сейчас будут переадресованы в службу поддержки: ',
    back: 'Вернуться назад',
    whatSubCategory: 'Какая подкатегория лучше всего описывает ваш вопрос? ',
    prvChatEnded: 'Приватный чат закрыт.',
    prvChatOpened: 'С клиентом открыт приватный чат.',
    prvChatEnd: 'Конец приватного чата',
    prvChatOpenedCustomer: 'Приватный чат открыт',
    instructionsSent: 'Инструкции были высланы вам в личные сообщения.',
    openTickets: 'Open Tickets',
    support: 'Поддержка',
    prvChatOnly: 'Эта команда может быть использована только в приватном чате.',
    ticketClosed: 'Ваш тикет был закрыт нашими сотрудниками. Вы можете открыть новый тикет в любое время.',
  },

  categories: [],
  /* <==== Remove this line if you want categories ====>
  categories:
    [
      {
        name: 'Category1', subgroups: [
          {name: 'Sub1', group_id: '-12345678910'},
          {name: 'Sub2', group_id: '-12345678910'},
          {name: 'Sub3', group_id: '-12345678910'},
        ],
      },
      {
        name: 'Category2', subgroups: [
          {name: 'Sub4', group_id: '-12345678910'},
          {name: 'Sub5', group_id: '-12345678910'},
          {name: 'Sub6', group_id: '-12345678910'},
        ],
      },
      {
        name: 'Category with no subcategories', group_id: '-12345678910'}
      },
      {
        name: 'Admin Chat', group_id: '-12345678910' 
      },
      {
        name: 'Contact', msg: 'Check out our Website'
      },
    ],
   /* <==== Remove this line if you want categories ====> */
};

export default config;
  
