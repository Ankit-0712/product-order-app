import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { product } from './models/product';
import { OrderItem } from './models/orderItem';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TtsService } from './service/tts.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  products: product[] =[
    {id : 'pencil', name: 'Pencil'},
    {id : 'eraser', name: 'Eraser'},
    {id : 'pens', name: 'Pens'}
  ];


  maxRows = 8;
  orderItem : OrderItem[] = []; // grid 2 data
  showSummary = false;

  constructor(private fb : FormBuilder, private tts : TtsService){}

  ngOnInit(): void {
      this.form = this.fb.group({
        rows: this.fb.array([])
      });
      this.addEmptyRows();
  }

 get rows(): FormArray<FormGroup> {
  return this.form.get('rows') as FormArray<FormGroup>;
}

  private createRowGroup() : FormGroup{
    return this.fb.group({
      productId: [null], //product id like 'pencil'
      productName : [null], //product display name
      quantity : [null], // treat 0 as invalid for adding
      locked : [false] // mark as locked after add
    });
  }
  
  private addEmptyRows(){
    if(this.rows.length < this.maxRows){
      this.rows.push(this.createRowGroup());
    }
  }

  onProductChange(i : number){
    const row = this.rows.at(i);
    const pid = row.value.productId;
    const p = this.products.find(x => x.id === pid);
    row.patchValue({productName : p ? p.name : null});
  }

  //add row
onAdd(i: number) {
  const row = this.rows.at(i);
  const { productId, productName, quantity } = row.value;

  const qty = Number(quantity); // ensure it's a number

  // Validate
  if (!productId && (qty == null || isNaN(qty))) {
    alert('Please choose a product and a quantity');
    return;
  }

  if (!productId) {
    alert('Please choose a product');
    return;
  }

  if (!qty || qty <= 0) {
    alert('Please choose a quantity (1-5)');
    return;
  }

  // Lock row
  row.patchValue({ locked: true });
  row.disable();

  // Merge into orderItem
  const existing = this.orderItem.find(x => x.productId === productId);
  if (existing) {
    existing.quantity = Number(existing.quantity) + qty;
  } else {
    this.orderItem.push({ productId, productName, quantity: qty });
  }

  // Add next row if allowed
  if (this.rows.length < this.maxRows) {
    this.addEmptyRows();
  }
}

  //remove any undifined rows and show grid 2

  onShowOrder(){

    const map = new Map<String, OrderItem>();
    this.rows.controls.forEach(r => {
      const v = r.value;

      if(v.productId && v.quantity && v.quantity >0){
        if(map.has(v.productId)){
          map.get(v.productId) !.quantity += v.quantity;
        }else{
          map.set(v.productId, {productId: v.productId, productName: v.productName, quantity: v.quantity});
        }
      }
    });

    this.orderItem = Array.from(map.values());
    this.showSummary = true;

    //set rows to only the filled/locked rows

    const newRows = Array.from(this.orderItem).map(it=>this.fb.group({
      productId : [it.productId],
      productName : [it.productName],
      quantity: [it.quantity],
      locked: [true]
    }));

    //replace formArrray
    this.form.setControl('rows', this.fb.array(newRows));
  }

  //tts : read grid 2

  onReadOrder(){
    if(!this.orderItem || this.orderItem.length===0){
      alert('No item in order');
      return;
    }

    const text = this.orderItem.map((it, idx)=> `${idx+1}. ${it.productName}, quantity ${it.quantity}`).join('. ');

    this.tts.speak(text).catch(err =>{
      console.log(err);
      alert('Text to Speech failed :' +(err?.message || err));
    });
  }

  //ui helpers : edit rows or remove row after locked
  onEditRow(i:number){
    const row = this.rows.at(i);
    row.enable();
    row.patchValue({locked : false});
  }

  onRemoveRow(i : number){
    //if row corresponds to consoliated item, also remove from orerItem

    const row = this.rows.at(i);
    const pid = row.value.productId;

    this.rows.removeAt(i);
    if(pid){
      this.orderItem = this.orderItem.filter(x=> x.productId !== pid);
    }

    //at least one row remain
    if(this.rows.length ===0) this.addEmptyRows();
  }
    
  }
  
  

