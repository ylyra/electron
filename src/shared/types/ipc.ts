export interface Document {
  id: string;
  title: string;
  content?: string;
}

// Requests
export interface FetchDocumentRequest {
  id: string;
}

export interface SaveDocumentRequest extends Document {}

export interface DeleteDocumentRequest {
  id: string;
}

// Responses
export interface FetchAllDocumentsResponse {
  data: Array<Document>;
}

export interface FetchDocumentResponse {
  data: Document;
}

export interface CreateDocumentResponse {
  data: Document;
}
