import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VertigoDataStoreManager } from './VertigoDataStoreManager';
import { VertigoInMemoryDataStore } from './VertigoInMemoryDataStore';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    VertigoDataStoreManager,
    VertigoInMemoryDataStore
  ]
})
export class ProcessingModule { }
