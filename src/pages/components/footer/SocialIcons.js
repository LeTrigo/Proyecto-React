import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";


<<<<<<< HEAD
=======

>>>>>>> origin/cart
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
<<<<<<< HEAD
                    color: #44BED4;                
                    height: 35px;
                    width:35px;   
                    font-size: 1.8rem;
=======
                    color: #44BED4;
                    heigth: 24px;
                    font-size: 2rem;
>>>>>>> origin/cart
                    border-radius:50%;
                    border:none;
                    display:flex;
                    justify-content:center;
<<<<<<< HEAD
                    align-items: center;
                    cursor:pointer;
                    margin:10px;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #44BED4;
                    color: #021F3F;
                }
                 

=======
                    align-content: center;
                    cursor:pointer;
                    margin:10px;
                }
>>>>>>> origin/cart
            
            `}</style>
        </>
    )
}

export default SocialIcons