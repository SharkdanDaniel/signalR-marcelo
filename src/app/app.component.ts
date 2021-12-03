import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignalRService } from './signal-r.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup = this.fb.group({
    token: ['', Validators.required],
    url: [''],
    method: [''],
  })
  response: any
  title = 'signalR-marcelo'

  constructor(private fb: FormBuilder, private signalR: SignalRService) { }

  onSubmit() {
    if (this.form.valid) {
      console.log('valido')
      this.signalR.createConnection(
        this.form.get('token')?.value,
        this.form.get('url')?.value ? this.form.get('url')?.value : undefined,
        this.form.get('method')?.value ? this.form.get('method')?.value : undefined,
      )
      this.signalR.receivedMethodComplete.subscribe((res) => {
        this.response = res
      })
    } else console.log('invalido')
  }
}
