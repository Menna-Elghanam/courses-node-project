class app_error extends  Error{
    constructor(){
        super()
    }
    create(message,status_code , status_message){
        this.message=message,
        this.status_code=status_code,
        this.status_message=status_message
        return this
    }
}
module.exports=new app_error;