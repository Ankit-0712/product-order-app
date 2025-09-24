import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  speak(text: string): Promise<void>{
    return new Promise((resolve, reject)=>{
      try{
        if('speechSynthesis' in window){
          const utter = new SpeechSynthesisUtterance(text);
          utter.onend = () => resolve();
          utter.onerror =(e) => reject(e);


          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        }else{
          reject(new Error('SpeechSynthesis not supported in this browser.'));
        }
      }
      catch(err){
        reject(err);
      }
    });
  }
}
