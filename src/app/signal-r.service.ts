import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private url = "inspection/upload";

  public receivedMethodComplete = new EventEmitter();

  private _hubConnection!: HubConnection

  constructor() { }

  createConnection(token: any, hubUrl = this.url, method = 'uploadComplete') {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`https://communication.bemmais.dev.br/hubs/${hubUrl}`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();
    this.startConnection(method);
  }

  startConnection(method: any) {
    this._hubConnection
      .start()
      .then(() => {
        console.log('connection signalR')
        this.receivedMethod(method);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  private receivedMethod(method = 'uploadComplete'): void {
    console.log('subscribe do método')
    this._hubConnection.on(method, (data: any) => {
      console.log('resposta do hub', data)
      this.receivedMethodComplete.emit(data);
    });
  }
}
