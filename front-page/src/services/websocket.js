export class BTCWebSocketService {
    ws = null;
    reconnectAttempts = 0;
    maxReconnectAttempts = 5;
    reconnectDelay = 3000;
    listeners = [];
    isConnected = false;
    constructor() {
        this.connect();
    }
    connect() {
        try {
            // 使用Binance WebSocket API獲取BTC價格
            this.ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
            this.ws.onopen = () => {
                console.log('WebSocket connected to Binance');
                this.isConnected = true;
                this.reconnectAttempts = 0;
            };
            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const btcPrice = {
                        symbol: 'BTC',
                        price: parseFloat(data.c), // 當前價格
                        change24h: parseFloat(data.P), // 24小時變化百分比
                        volume24h: parseFloat(data.v), // 24小時交易量
                        marketCap: parseFloat(data.c) * parseFloat(data.Q), // 市值估算
                        lastUpdated: new Date()
                    };
                    this.notifyListeners(btcPrice);
                }
                catch (error) {
                    console.error('Error parsing WebSocket data:', error);
                }
            };
            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.isConnected = false;
                this.attemptReconnect();
            };
            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnected = false;
            };
        }
        catch (error) {
            console.error('Error creating WebSocket connection:', error);
            this.attemptReconnect();
        }
    }
    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => {
                this.connect();
            }, this.reconnectDelay);
        }
        else {
            console.error('Max reconnection attempts reached');
        }
    }
    subscribe(callback) {
        this.listeners.push(callback);
        // 返回取消訂閱的函數
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    notifyListeners(data) {
        this.listeners.forEach((callback) => {
            try {
                callback(data);
            }
            catch (error) {
                console.error('Error in WebSocket callback:', error);
            }
        });
    }
    getConnectionStatus() {
        return this.isConnected;
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.listeners = [];
        this.isConnected = false;
    }
}
// 創建單例實例
export const btcWebSocketService = new BTCWebSocketService();
//# sourceMappingURL=websocket.js.map