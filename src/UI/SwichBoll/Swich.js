import classes from './Swich.module.css'
const Swich = ({onClick}) => {
    return(
         <label className={classes.check_container} >
                <input type='checkbox' onClick={onClick}/>
                <span className={classes.ball} ></span>
         </label>
    )
}
export default  Swich;