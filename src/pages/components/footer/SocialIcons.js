import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";


const SocialIcons = () => {
    return (
        <>
            <div>
                <button><FaFacebook /></button>
                <button><FaInstagram /></button>
                <button><FaTwitter /></button>
                <button><FaTiktok /></button>
            </div>


            <style jsx>{`
                div{
                    display:flex;
                    
                }
                button{
                    background-color: #021F3F;
                    color: #44BED4;                
                    height: 35px;
                    width:35px;   
                    font-size: 1.8rem;
                    border-radius:50%;
                    border:none;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    cursor:pointer;
                    margin:10px;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #44BED4;
                    color: #021F3F;
                }
                 

            
            `}</style>
        </>
    )
}

export default SocialIcons