import styles from '../../styles/preview.module.css'

export default function Preview(){
    return (
                <div style={{display:'flex',alignItems:'flex-start',flexDirection:'column',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img className={styles.blink_2}  style={{width:'40px',height:'40px',marginRight:'.5rem',marginBottom:'.5rem',backgroundColor:'lightgrey',borderRadius:'50%'}} />
                        {/* {JSON.stringify(refTopic)} */}
                        <div  className={styles.blink_1}  style={{width:'100%',height:'10px',backgroundColor:"lightgrey"}} />
                        <div className={styles.blink_2}  style={{marginTop:'.5rem',width:'100%',height:'10px',backgroundColor:"lightgrey"}} />

                        <div className={styles.blink_1} style={{width:'100%',height:'50px',backgroundColor:'lightgrey', borderRadius:'.5rem',marginTop:'.5rem',marginBottom:'.5rem'}}/>
                    <div className={styles.blink_2}  style={{marginBottom:'.5rem',width:'100%',height:'10px',backgroundColor:"lightgrey"}}/>
                    <div className={styles.blink_1}  style={{width:'20%',height:'10px',marginBottom:"1rem",backgroundColor:'lightgrey',}} />
                </div>
    )
}