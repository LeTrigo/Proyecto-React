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
                    heigth: 24px;
                    font-size: 2rem;
                    border-radius:50%;
                    border:none;
                    display:flex;
                    justify-content:center;
                    align-content: center;
                    cursor:pointer;
                    margin:10px;
                }
            
            `}</style>
        </>
    )
}

export default SocialIcons