import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc, DocumentReference  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private todoCollection;

  constructor(private firestore: Firestore) {
    this.todoCollection = collection(this.firestore, 'tasks');
  }

  // Add a new task to Firestore
  addTask(task: Task): Promise<DocumentReference > {
    return addDoc(this.todoCollection, task);
  }
  // Fetch all tasks from Firestore
  getTasks(): Observable<Task[]> {
    return collectionData(this.todoCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  // Delete a task from Firestore
  deleteTask(taskId: string): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    return deleteDoc(taskDocRef);
  }
}
