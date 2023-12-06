export class ResponseBase {
    status: boolean;
    message: string;
    data: any;
    constructor() {
      this.status = false;
      this.message = '';
      this.data = '';
  
    }
  }