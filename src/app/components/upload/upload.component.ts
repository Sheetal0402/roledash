import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card.component';

interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Data Upload</h2>
        <p class="text-gray-600 mt-2">Upload CSV or Excel files for data processing</p>
      </div>

      <!-- Upload Instructions -->
      <app-card title="Upload Instructions" subtitle="Please read before uploading files">
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 text-sm font-semibold">1</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">File Format</h4>
              <p class="text-gray-600 text-sm">Support for CSV (.csv) and Excel (.xlsx, .xls) files only</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 text-sm font-semibold">2</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">File Size</h4>
              <p class="text-gray-600 text-sm">Maximum file size: 10MB per file</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 text-sm font-semibold">3</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Required Columns</h4>
              <p class="text-gray-600 text-sm">Ensure your file contains: Region, Territory, Sales, Target, Manager</p>
            </div>
          </div>
        </div>
      </app-card>

      <!-- File Upload Area -->
      <app-card title="Upload Files" subtitle="Drag and drop or click to select files">
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          [class.border-blue-500]="isDragOver"
          [class.bg-blue-50]="isDragOver"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          (click)="fileInput.click()"
        >
          <div class="mx-auto w-12 h-12 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"></path>
            </svg>
          </div>
          <p class="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</p>
          <p class="text-gray-600 mb-4">or</p>
          <button
            type="button"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Choose Files
          </button>
          <p class="text-sm text-gray-500 mt-4">CSV, XLS, XLSX up to 10MB</p>
        </div>

        <input
          #fileInput
          type="file"
          multiple
          accept=".csv,.xlsx,.xls"
          (change)="onFileSelect($event)"
          class="hidden"
        >
      </app-card>

      <!-- Upload Queue -->
      <app-card *ngIf="uploadFiles.length > 0" title="Upload Queue" subtitle="Files ready for processing">
        <div class="space-y-4">
          <div
            *ngFor="let uploadFile of uploadFiles; let i = index"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            [class.bg-green-50]="uploadFile.status === 'success'"
            [class.bg-red-50]="uploadFile.status === 'error'"
            [class.bg-blue-50]="uploadFile.status === 'uploading'"
          >
            <div class="flex items-center space-x-3 flex-1">
              <div class="flex-shrink-0">
                <svg
                  *ngIf="uploadFile.status === 'pending'"
                  class="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <svg
                  *ngIf="uploadFile.status === 'uploading'"
                  class="w-8 h-8 text-blue-500 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg
                  *ngIf="uploadFile.status === 'success'"
                  class="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg
                  *ngIf="uploadFile.status === 'error'"
                  class="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ uploadFile.file.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatFileSize(uploadFile.file.size) }}</p>
                </div>
                
                <div *ngIf="uploadFile.status === 'uploading'" class="mt-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Uploading...</span>
                    <span class="text-gray-600">{{ uploadFile.progress }}%</span>
                  </div>
                  <div class="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      [style.width.%]="uploadFile.progress"
                    ></div>
                  </div>
                </div>
                
                <p
                  *ngIf="uploadFile.message"
                  class="text-sm mt-1"
                  [class.text-green-600]="uploadFile.status === 'success'"
                  [class.text-red-600]="uploadFile.status === 'error'"
                  [class.text-blue-600]="uploadFile.status === 'uploading'"
                >
                  {{ uploadFile.message }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 ml-4">
              <button
                *ngIf="uploadFile.status === 'pending'"
                (click)="startUpload(i)"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
              <button
                *ngIf="uploadFile.status === 'error'"
                (click)="retryUpload(i)"
                class="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Retry
              </button>
              <button
                (click)="removeFile(i)"
                class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button
            (click)="uploadAll()"
            [disabled]="!hasPendingFiles"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Upload All Files
          </button>
          <button
            (click)="clearAll()"
            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>
      </app-card>

      <!-- Validation Messages -->
      <app-card *ngIf="validationMessages.length > 0" title="Validation Results" subtitle="File validation status">
        <div class="space-y-3">
          <div
            *ngFor="let message of validationMessages"
            class="flex items-start space-x-3 p-3 rounded-lg"
            [class.bg-red-50]="message.type === 'error'"
            [class.bg-yellow-50]="message.type === 'warning'"
            [class.bg-green-50]="message.type === 'success'"
          >
            <div class="flex-shrink-0 mt-0.5">
              <svg
                *ngIf="message.type === 'error'"
                class="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg
                *ngIf="message.type === 'warning'"
                class="w-5 h-5 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <svg
                *ngIf="message.type === 'success'"
                class="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p
                class="text-sm font-medium"
                [class.text-red-800]="message.type === 'error'"
                [class.text-yellow-800]="message.type === 'warning'"
                [class.text-green-800]="message.type === 'success'"
              >
                {{ message.file }}
              </p>
              <p
                class="text-sm"
                [class.text-red-600]="message.type === 'error'"
                [class.text-yellow-600]="message.type === 'warning'"
                [class.text-green-600]="message.type === 'success'"
              >
                {{ message.message }}
              </p>
            </div>
          </div>
        </div>
      </app-card>

      <!-- Recent Uploads -->
      <app-card title="Recent Uploads" subtitle="Previously uploaded files">
        <div class="space-y-3">
          <div
            *ngFor="let upload of recentUploads"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ upload.filename }}</p>
                <p class="text-xs text-gray-600">{{ upload.uploadedAt }} • {{ upload.records }} records processed</p>
              </div>
            </div>
            <button class="text-blue-600 hover:text-blue-900 text-sm">View Details</button>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class UploadComponent {
  uploadFiles: UploadFile[] = [];
  isDragOver = false;
  validationMessages: Array<{file: string, message: string, type: 'error' | 'warning' | 'success'}> = [];
  
  recentUploads = [
    {
      filename: 'Q3_Sales_Data.xlsx',
      uploadedAt: '2 hours ago',
      records: 1250
    },
    {
      filename: 'Regional_Performance.csv',
      uploadedAt: '1 day ago',
      records: 890
    },
    {
      filename: 'Territory_Targets.xlsx',
      uploadedAt: '3 days ago',
      records: 456
    }
  ];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (this.validateFile(file)) {
        const uploadFile: UploadFile = {
          file,
          progress: 0,
          status: 'pending'
        };
        this.uploadFiles.push(uploadFile);
      }
    });
  }

  private validateFile(file: File): boolean {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    // Check file type
    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      this.addValidationMessage(file.name, 'Invalid file type. Please upload CSV or Excel files only.', 'error');
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      this.addValidationMessage(file.name, 'File size exceeds 10MB limit.', 'error');
      return false;
    }

    // Check if file already exists
    if (this.uploadFiles.some(uf => uf.file.name === file.name)) {
      this.addValidationMessage(file.name, 'File already added to upload queue.', 'warning');
      return false;
    }

    this.addValidationMessage(file.name, 'File validated successfully.', 'success');
    return true;
  }

  private addValidationMessage(file: string, message: string, type: 'error' | 'warning' | 'success'): void {
    this.validationMessages.push({ file, message, type });
    
    // Auto-remove success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.validationMessages = this.validationMessages.filter(
          msg => !(msg.file === file && msg.message === message && msg.type === type)
        );
      }, 3000);
    }
  }

  startUpload(index: number): void {
    const uploadFile = this.uploadFiles[index];
    uploadFile.status = 'uploading';
    uploadFile.message = 'Processing file...';
    
    // Simulate upload progress
    this.simulateUploadProgress(uploadFile);
  }

  private simulateUploadProgress(uploadFile: UploadFile): void {
    const interval = setInterval(() => {
      uploadFile.progress += Math.random() * 15;
      
      if (uploadFile.progress >= 100) {
        uploadFile.progress = 100;
        clearInterval(interval);
        
        // Simulate random success/failure
        if (Math.random() > 0.2) { // 80% success rate
          uploadFile.status = 'success';
          uploadFile.message = `Successfully processed ${Math.floor(Math.random() * 1000) + 100} records`;
        } else {
          uploadFile.status = 'error';
          uploadFile.message = 'Upload failed: Invalid data format detected';
        }
      } else {
        uploadFile.message = `Uploading... ${Math.floor(uploadFile.progress)}%`;
      }
    }, 200);
  }

  retryUpload(index: number): void {
    const uploadFile = this.uploadFiles[index];
    uploadFile.status = 'pending';
    uploadFile.progress = 0;
    uploadFile.message = undefined;
    this.startUpload(index);
  }

  removeFile(index: number): void {
    this.uploadFiles.splice(index, 1);
  }

  uploadAll(): void {
    this.uploadFiles.forEach((uploadFile, index) => {
      if (uploadFile.status === 'pending') {
        setTimeout(() => this.startUpload(index), index * 100);
      }
    });
  }

  clearAll(): void {
    this.uploadFiles = [];
    this.validationMessages = [];
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  get hasPendingFiles(): boolean {
    return this.uploadFiles.some(file => file.status === 'pending');
  }
}
