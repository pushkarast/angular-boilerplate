export default {
  callchatoption: [
    { name: 'None', value: 'none' },
    { name: 'In Progress', value: 'inprogress' },
    { name: 'Completed', value: 'completed' },
    { name: 'Cancelled', value: 'cancelled' },
    { name: 'Refunded', value: 'refunded' },
    { name: 'Paid', value: 'paid' },
    { name: 'Free', value: 'free' },
  ] as any,
  notifications: {
    notificationType: [
      { name: 'Normal Notification', value: 'normal' },
      { name: 'New App Update Available', value: 'update' },
      { name: 'New Video Released', value: 'video' },
    ] as any,
    notificationFor: [
      { name: 'Astrologers', value: 'Astrologers' },
      { name: 'Customers', value: 'Customers' },
    ] as any,
    scheduleIt: [
      { name: 'Yes', value: 'Yes' },
      { name: 'No', value: 'No' },
    ] as any,
    scheduleType: [
      { name: 'Daily', value: 'Daily' },
      { name: 'Weekly', value: 'Weekly' },
      { name: 'Monthly', value: 'Monthly' },
    ] as any,
  },
  rating: [
    { name: 5, value: 5 },
    { name: 4, value: 4 },
    { name: 3, value: 3 },
    { name: 2, value: 2 },
    { name: 1, value: 1 },
  ],
  status: [
    { name: 'Active', value: 1 },
    { name: 'De-active', value: 0 },
  ],
  paymentStatusOptions: [
    { name: 'None', value: null },
    // { name: 'combine', value: 'Combine' },
    { name: 'Success', value: 'Success' },
    { name: 'Declined', value: 'Declined' },
  ] as any,
  categoryTags: [
    { name: 'test1', value: 'test1' },
    // { name: 'combine', value: 'Combine' },
    { name: 'test2', value: 'test2' },
    { name: 'test3', value: 'test3' },
  ] as any,
  supportStatus: [
    { name: 'None', value: 'none' },
    { name: 'Open', value: '0' },
    { name: 'Resolved', value: '1' },
    { name: 'Closed', value: '2' },
  ] as any,
  updateStatus: [
    { name: 'Open', value: '0' },
    { name: 'Resolved', value: '1' },
    { name: 'Closed', value: '2' },
  ] as any,
  rank_filer: [
    { name: 'None', value: '0' },
    { name: 'Rank: Ascending', value: '1' },
    { name: 'Rank: Descending', value: '2' },
  ] as any,
  byRank: [
    { name: 'None', value: '0' },
    { name: 'Rank: Ascending', value: '1' },
    { name: 'Rank: Descending', value: '2' },
  ] as any,

  byRankRepeatCustomer: [
    { name: 'None', value: '0' },
    { name: 'Rank: Ascending', value: '1' },
    { name: 'Rank: Descending', value: '2' },
  ] as any,
  approve_not: [
    { name: 'None', value: 'None' },
    { name: 'Feedback - Approved', value: 'approved' },
    { name: 'Feedback - Not Approved', value: 'declined' },
    { name: 'Feedback - Marked Negative', value: 'negative' },
    { name: 'Astrologer Reply - Approved', value: 'approvedAstroReply' },
    { name: 'Astrologer Reply - Not Approved', value: 'declinedAstroReply' },
    { name: 'Astrologer Reply - Pending', value: 'pendingAstroReply' },
  ],
  country: [
    { name: 'India', value: 1 },
    { name: 'USA', value: 2 },
  ],
  gender: [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
  ],
  busy_time: [
    { name: 'None', value: '0' },
    { name: 'Rank: Ascending', value: '1' },
    { name: 'Rank: Descending', value: '2' },
  ] as any,
  online_time: [
    { name: 'None', value: '0' },
    { name: 'Online Time: High-Low', value: '1' },
    { name: 'Online Time: Low-High', value: '2' },
  ] as any,

  date_filter: [
    { name: 'Last 7 days', value: '0' },
    { name: 'Last 30 days', value: '1' },
    { name: 'Last 90 days', value: '2' },
  ] as any,
  call_chat_type: [
    { name: 'chat time', value: '2' },
    { name: 'call time', value: '1' },
    { name: 'Both', value: '0' },
  ] as any,
  filter: [
    { name: 'Mobile No.', value: 'mobile' },
    { name: 'Customer Name', value: 'name' },
    { name: 'Astrologer Name', value: 'aname' },
    { name: 'Unique Id', value: 'id' },
  ] as any,
  bannerType: [
    { name: 'From Link', value: '1' },
    { name: 'From List', value: '2' },
  ],
  yesno: [
    { name: 'Yes', value: '1' },
    { name: 'No', value: '0' },
  ] as any,
  scratchType: [
    { name: 'call', value: '0' },
    { name: 'chat', value: '1' },
    { name: 'recharge-discount', value: '2' },
  ] as any,
  callChatCountFilter: [
    { name: 'None', value: null },
    { name: '>=100', value: '100' },
    { name: '>=500', value: '500' },
    { name: '>=1000', value: '1000' },
  ] as any,
  moneySpentFilter: [
    { name: 'None', value: null },
    { name: '0-100', value: '1' },
    { name: '101-200', value: '2' },
    { name: '201-300', value: '3' },
    { name: '301-500', value: '4' },
    { name: '501-700', value: '5' },
    { name: '701-1000', value: '6' },
    { name: '1001-1500', value: '7' },
    { name: '1501-2000', value: '8' },
    { name: '2001-3000', value: '9' },
    { name: '3001-4000', value: '10' },
    { name: '4001-5000', value: '11' },
    { name: '5001-7000', value: '12' },
    { name: '7000+', value: '13' },
  ] as any,
  rechargeTimesFilter: [
    { name: 'None', value: null },
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: 'more than 5 times', value: '6' },
  ] as any,
  scratchCardCustFilterType: [
    { name: 'None', value: null },
    { name: 'Only Installed', value: '0' },
    { name: 'Only Free Call Claimed', value: '1' },
  ] as any,
  minAmtOrSepecificAmt: [
    // { name: 'None', value: null },
    {
      name: 'Set Minimum Amount ( Offer will be applied on more than selected amount. )',
      value: '0',
    },
    { name: 'Set Fix Amount', value: '1' },
  ] as any,
  freeOrPaidOption: [
    // { name: 'None', value: null },
    { name: 'Free', value: '0' },
    { name: 'Paid', value: '1' },
  ] as any,
  astroProfilefilter: [
    { name: 'Mobile No.', value: 'mobile' },
    { name: 'Customer Name', value: 'name' },
    { name: 'Unique Id', value: 'id' },
  ],
  productType: [
    { name: 'Product', value: '1' },
    { name: 'Service', value: '0' },
  ] as any,
  productForType: [
    { name: "MyAstroguruji's Product", value: 'inhouse' },
    { name: "Astrologer's Product", value: 'astroproduct' },
  ] as any,
  status1: [
    { name: 'Active', value: 0 },
    { name: 'De-active', value: 1 },
  ],
  statusString: [
    { name: 'Active', value: '0' },
    { name: 'De-active', value: '1' },
  ],
  deliveryStatus: [
    { name: 'Shipped', value: 3 },
    { name: 'Delivered', value: 4 },
  ],
  commentFilter: [
    { name: 'None', value: 'None' },
    { name: 'Approved', value: 'approved' },
    { name: 'Not Approved', value: 'declined' },
  ],
  callLogTypeFilter: [
    { name: 'None', value: null },
    { name: 'Call', value: '0' },
    { name: 'Chat', value: '1' },
    { name: 'video-call', value: '2' },
  ],
  typeforRashi: [
    { name: 'Daily', value: 'Daily' },
    { name: 'Weekly', value: 'Weekly' },
    { name: 'Monthly', value: 'Monthly' },
    { name: 'Annually', value: 'Annually' },
  ],
  month: [
    { name: 'Jan', value: 1 },
    { name: 'Feb', value: 2 },
    { name: 'Mar', value: 3 },
    { name: 'Apr', value: 4 },
    { name: 'May', value: 5 },
    { name: 'Jun', value: 6 },
    { name: 'Jul', value: 7 },
    { name: 'Aug', value: 8 },
    { name: 'Sept', value: 9 },
    { name: 'Oct', value: 10 },
    { name: 'Nov', value: 11 },
    { name: 'Dec', value: 12 },
  ],
  popupType: [
    { name: 'For all customers', value: 'all' },
    {
      name: 'Customer having free call or chat available',
      value: 'avail_free',
    },
  ],
  popupRedirection: [
    { name: 'Popup without link', value: 0 },
    { name: 'Redirect customer when he/she clicks on the popup', value: 1 },
  ],
  popupRedirect_to: [
    { name: 'Custom link', value: '1' },
    { name: 'A blog Page', value: '2' },
    { name: 'Astrologers profile ', value: '3' },
    { name: 'Recharge page', value: '4' },
    { name: 'Free call page', value: '5' },
    { name: 'Free chat page', value: '6' },
  ],
  serviceFilter: [
    { name: 'None', value: null },
    { name: 'Service Booked By User,Form Pending', value: '1' },
    { name: 'Form Updated By User,Time Pending', value: '2' },
    { name: 'Time Updated By Astrologer,Time Selection Pending', value: '3' },
    { name: 'Time Selected By User,Puja Pending', value: '4' },
    { name: 'Puja Started', value: '5' },
    { name: 'Puja Completed', value: '6' },
  ],
  customerActiveStatus: [
    { name: 'Active', value: '1' },
    { name: 'InActive', value: '0' },
  ],
  onlineModeType: [
    { name: 'call', value: '1' },
    { name: 'chat', value: '2' },
    { name: 'video-call', value: '5' },
    { name: 'emergency-call', value: '4' },
    { name: 'emergency-chat', value: '3' },
  ],
  customerOtherStatus: [
    { name: 'Only Installed', value: '1' },
    { name: 'Only promotinal free call claimed', value: '0' },
    { name: 'First Paid Call', value: '0' },   // only one paid call no other activity
    { name: 'First Paid Chat', value: '0' },
    { name: 'First Recharge of 50 /-', value: '0' },  // recharged 50 rs and no other activity
  ],
  freeCallChatVCallFilter: [
    { name: 'None', value: null },
    { name: 'Free Chat', value: '0' },
    { name: 'Free Call ', value: '1' },   // only one paid call no other activity
    // { name: 'Free Video call', value: '2'},
  ],
  firstPaidCallChatFilter: [
    { name: 'None', value: null },
    { name: 'First Paid Call', value: '0' },
    { name: 'First Paid Chat', value: '1' },
    { name: 'First Paid Video-Call', value: '2' },
  ],
  fiftyRsRechargeFilter: [
    { name: 'None', value: null },
    { name: 'First Recharge of 50/-', value: '50' },
    { name: 'First Recharge of 100/-', value: '100' },
  ],
  customerPanelCustomFilter: [
    { name: 'None', value: null },
    { name: 'Only Installed', value: '0' },
  ],
  accountStatusAstro: [
    { name: 'None', value: null },
    { name: 'Active', value: '1' },
    { name: 'Inactive', value: '0' }
  ],
  notificationLink: [
    { name: 'Calls', value: '1' },//all are with reference to commonMethods.notificationTypeUser in BE
    { name: 'Chats', value: '2' },
    { name: 'Astrologer', value: '3' },
    { name: 'Recharge', value: '9' },
    { name: 'Blogs', value: '10' }
  ],
  customRecharge: [
    { name: 'Custom Recharge', value: 1 },
    { name: 'Free Call', value: 2 },
  ],
  photoFilter: [
    { name: 'None', value: null },
    { name: 'Not Approved Photos', value: "0" },
    { name: 'New Onboards(Last 30 days)', value: "1" }
  ],
  contactStatus: [
    { name: 'Completed', value: '0' },
    { name: 'Un-reachable', value: '1' },
    { name: 'Not able to answer', value: '2' },
  ],
  telefilterOption: [
    { name: 'None', value: 'none' },
    { name: 'In Progress', value: 'inprogress' },
    { name: 'Completed', value: 'completed' },
    { name: 'Marked to Admin', value: 'marked' },
  ],
  scratchCardFilter: [
    { name: 'None', value: null },
    { name: 'New', value: '1' },
    { name: 'Used', value: '3' },
    { name: 'Expired', value: '4' }
  ],
  broadcastType: [
    { name: 'Single', value: '0' },
    { name: 'Multiple', value: '1' }
  ],
  categories: [
    { name: 'Love', value: 'Love' },
    { name: 'Carrer', value: 'Carrer' },
    { name: 'Education', value: 'Education' },
    { name: 'Family Issues', value: 'Family Issues' },
  ],
  tags: [
    { name: 'Must Try', value: 'Must Try' },
    { name: 'Celebrity', value: 'Celebrity' },
    { name: 'Top Choice', value: 'Top Choice' },
  ],
};
