import classes from './Music.module.css'
import { useForm,SubmitHandler } from 'react-hook-form';



function Music() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => console.log(data);
    
    //  console.log(watch("example")); // watch input value by passing the name of it
    
      return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("mail",{maxLength:10})} />
    
          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("password", { required: true})} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
    
          <input type="submit" />
        </form>
      );
}

export default Music;