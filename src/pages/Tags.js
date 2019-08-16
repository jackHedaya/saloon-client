import React from "react";


import Divider from 'react-divider'
import "./styles/Tags.scss"

function Tags(){
    

    return (
        <div>
            <div class="h1">
                <h1 >Tags</h1>
            </div>
            <div class="tags_letters">
                <alphabet_list/>
            </div>
           {/* <tags_list/> */}
           
        </div>
    );
}

function alphabet_list() {
    const dict = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
                    "Q","R","S","T","U","V","W","X","Y","Z"]
    return (
       <div>
           <ul>
            {dict.map((value, index) => {
                return <li key={index}>{value}</li>})}
        </ul>
       </div>
    );
}

function tags_list(){
    return (
        <div> Hello</div>

    );
}
export default Tags;