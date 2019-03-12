import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotesRoutingModule } from './notes-routing.module';
import { LocalStorageTextAreaComponent } from './home/local-storage-text-area/local-storage-text-area.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LocalStorageTextAreaComponent],
  imports: [CommonModule, NotesRoutingModule, ReactiveFormsModule]
})
export class NotesModule {}
