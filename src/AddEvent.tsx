import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from "@material-ui/core"
import React from "react"
import {FC} from "react"
import {useForm,SubmitHandler} from 'react-hook-form'

interface Props{
    handleClose:()=>any;
    handleAdd:(data:any)=>any;
}
interface FormInput{
    title:string,
    amount:string
}
const AddEvent:FC<Props>=(Props)=>{
    const {register,handleSubmit}=useForm<FormInput>();
    const submitData:SubmitHandler<FormInput>=(data:FormInput)=>{
        Props.handleAdd(data);
    }


    return <Dialog open={true} onClose={Props.handleClose}>  
        <form onSubmit={handleSubmit(submitData)}>
            <DialogContent>
                <TextField placeholder="Title" {...register('title')}/>
                <TextField placeholder="Amount" {...register('amount')}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary">Add</Button>
                <Button onClick={Props.handleClose}>Cancel</Button>
            </DialogActions>
        </form>
    </Dialog>
}
export default AddEvent