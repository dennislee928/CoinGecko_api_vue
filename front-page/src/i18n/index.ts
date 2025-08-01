import { createI18n } from 'vue-i18n'

// 中文語言包
const zh = {
  // 導航
  nav: {
    marketOverview: '市場概覽',
    coinList: '幣種列表'
  },

  // 頁面標題
  page: {
    marketOverview: '市場概覽',
    marketOverviewSubtitle: '全球加密貨幣市場實時數據',
    coinList: '幣種列表',
    coinListSubtitle: '探索全球加密貨幣市場'
  },

  // 市場概覽
  market: {
    totalMarketCap: '總市值',
    volume24h: '24小時交易量',
    bitcoinDominance: '比特幣主導地位',
    activeCoins: '活躍幣種',
    marketDetails: '市場詳細數據',
    viewCoinList: '查看幣種列表',
    historicalHighMarketCap: '歷史最高市值',
    historicalHighVolume: '歷史最高交易量',
    fromHistoricalHigh: '從歷史高點下跌',
    toHistoricalHigh: '距離歷史高點',
    lastUpdated: '最後更新',
    marketTrends: '市場趨勢',
    marketCapChange: '市值變化',
    volumeChange: '交易量變化',
    loadFailed: '載入失敗',
    loadFailedMessage: '無法載入市場數據，請稍後再試',
    reload: '重新載入',
    loading: '載入市場數據中...'
  },

  // 幣種列表
  coins: {
    searchPlaceholder: '搜尋幣種...',
    filters: {
      all: '全部',
      top10: '前10名',
      top50: '前50名',
      top100: '前100名'
    },
    price: '價格',
    change24h: '24h',
    rank: '排名',
    loadMore: '載入更多',
    loading: '載入幣種資料中...',
    noResults: '找不到相關幣種',
    noResultsMessage: '請嘗試其他搜尋關鍵字'
  },

  // 幣種詳情
  coinDetail: {
    rank: '排名',
    active: '活躍',
    inactive: '非活躍',
    newCoin: '新幣種',
    basicInfo: '基本資訊',
    type: '類型',
    developmentStatus: '開發狀態',
    hardwareWallet: '硬體錢包',
    supported: '支援',
    notSupported: '不支援',
    proofType: '證明類型',
    hashAlgorithm: '雜湊演算法',
    orgStructure: '組織結構',
    startDate: '開始時間',
    tags: '標籤',
    team: '團隊',
    links: '相關連結',
    website: '官方網站',
    twitter: 'Twitter',
    reddit: 'Reddit',
    sourceCode: '原始碼',
    technicalDoc: '技術文件',
    explorer: '區塊鏈瀏覽器',
    messageBoard: '討論區',
    whitepaper: '白皮書',
    viewWhitepaper: '查看白皮書',
    projectDescription: '專案描述',
    loadFailed: '載入失敗',
    loadFailedMessage: '無法載入幣種資料，請稍後再試',
    loading: '載入幣種資料中...'
  },

  // 通用
  common: {
    loading: '載入中...',
    error: '錯誤',
    retry: '重試',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    close: '關閉',
    save: '保存',
    cancel: '取消',
    confirm: '確認',
    delete: '刪除',
    edit: '編輯',
    add: '新增',
    search: '搜尋',
    filter: '篩選',
    sort: '排序',
    refresh: '重新整理',
    copy: '複製',
    share: '分享',
    download: '下載',
    upload: '上傳',
    settings: '設定',
    profile: '個人資料',
    logout: '登出',
    login: '登入',
    register: '註冊',
    language: '語言',
    theme: '主題',
    darkMode: '深色模式',
    lightMode: '淺色模式',
    autoMode: '自動模式'
  }
}

// 英文語言包
const en = {
  // Navigation
  nav: {
    marketOverview: 'Market Overview',
    coinList: 'Coin List'
  },

  // Page titles
  page: {
    marketOverview: 'Market Overview',
    marketOverviewSubtitle: 'Global Cryptocurrency Market Real-time Data',
    coinList: 'Coin List',
    coinListSubtitle: 'Explore Global Cryptocurrency Market'
  },

  // Market overview
  market: {
    totalMarketCap: 'Total Market Cap',
    volume24h: '24h Volume',
    bitcoinDominance: 'Bitcoin Dominance',
    activeCoins: 'Active Coins',
    marketDetails: 'Market Details',
    viewCoinList: 'View Coin List',
    historicalHighMarketCap: 'Historical High Market Cap',
    historicalHighVolume: 'Historical High Volume',
    fromHistoricalHigh: 'From Historical High',
    toHistoricalHigh: 'To Historical High',
    lastUpdated: 'Last Updated',
    marketTrends: 'Market Trends',
    marketCapChange: 'Market Cap Change',
    volumeChange: 'Volume Change',
    loadFailed: 'Load Failed',
    loadFailedMessage: 'Unable to load market data, please try again later',
    reload: 'Reload',
    loading: 'Loading market data...'
  },

  // Coin list
  coins: {
    searchPlaceholder: 'Search coins...',
    filters: {
      all: 'All',
      top10: 'Top 10',
      top50: 'Top 50',
      top100: 'Top 100'
    },
    price: 'Price',
    change24h: '24h',
    rank: 'Rank',
    loadMore: 'Load More',
    loading: 'Loading coin data...',
    noResults: 'No coins found',
    noResultsMessage: 'Please try different search keywords'
  },

  // Coin detail
  coinDetail: {
    rank: 'Rank',
    active: 'Active',
    inactive: 'Inactive',
    newCoin: 'New Coin',
    basicInfo: 'Basic Information',
    type: 'Type',
    developmentStatus: 'Development Status',
    hardwareWallet: 'Hardware Wallet',
    supported: 'Supported',
    notSupported: 'Not Supported',
    proofType: 'Proof Type',
    hashAlgorithm: 'Hash Algorithm',
    orgStructure: 'Organization Structure',
    startDate: 'Start Date',
    tags: 'Tags',
    team: 'Team',
    links: 'Related Links',
    website: 'Official Website',
    twitter: 'Twitter',
    reddit: 'Reddit',
    sourceCode: 'Source Code',
    technicalDoc: 'Technical Documentation',
    explorer: 'Blockchain Explorer',
    messageBoard: 'Message Board',
    whitepaper: 'Whitepaper',
    viewWhitepaper: 'View Whitepaper',
    projectDescription: 'Project Description',
    loadFailed: 'Load Failed',
    loadFailedMessage: 'Unable to load coin data, please try again later',
    loading: 'Loading coin data...'
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    copy: 'Copy',
    share: 'Share',
    download: 'Download',
    upload: 'Upload',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    autoMode: 'Auto Mode'
  }
}

// 創建i18n實例
const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: localStorage.getItem('locale') || 'zh', // 預設語言
  fallbackLocale: 'en', // 備用語言
  messages: {
    zh,
    en
  }
})

// 語言切換函數
export const setLocale = (locale: 'zh' | 'en') => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

// 獲取當前語言
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// 獲取支援的語言列表
export const getSupportedLocales = () => {
  return [
    { code: 'zh', name: '中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]
}

export default i18n
