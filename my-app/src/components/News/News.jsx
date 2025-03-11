import { useEffect } from 'react';
import classes from './News.module.css'

const News = ()=> {

    useEffect(()=>{
        console.log('рендер')
    })

    return (
        <div>News</div>
    );
}

export default News;