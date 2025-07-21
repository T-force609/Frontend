import ImageIcon from './ImageIcon.jpeg'

const Home = () => {

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row ">
            <div className=" rounded-full overflow-hidden w-[300px] h-[300px] ml-4 mt-[100px] mr-4 mr-20 border-[10px] border-red-300 sm:w-[300px] h-[300px]">
                <img src={ImageIcon} alt="icon" className="w-full h-full"/>
            </div>
            <div className="block w-full h-full md:flex w-2/3 h-2/3 pt-20 justify-center ">
                <div className='flex flex-row w-[100%] h-[120px] items-center justify-center sm:w-[100%] mb-[60px] '>
                    <p className="text-gray-200 ml-4 w-auto">I specialize in creating stunning 3D art with Blender, building dynamic web applications
                        using Django and React, and developing intelligent machine learning solutions with Python.
                        Whether you need captivating visual designs, robust web platforms, or AI-powered tools,
                        I deliver creative and technical excellence tailored to your project needs.
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default Home;
