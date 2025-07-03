import ImageIcon from './ImageIcon.jpeg'

const Home = () => {

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center lg:flex-row items-center justify-center md:flex-col items-center justify-center sm:flex-col items-center justity-center ">
            <div className=" rounded-full overflow-hidden w-[300px] h-[300px] ml-20 mt-[100px] mr-20 border-[10px] border-red-300 sm:mt-0 mb-4">
                <img src={ImageIcon} alt="icon" className='h-full w-full'/>
            </div>
            <div className="flex w-2/3 h-2/3 pt-20 justify-center ">
                <div className='flex flex-row w-[100%] h-[120px] items-center justify-center sm:w-[100%] mb-[60px] '>
                    <p className="text-gray-200">I specialize in creating stunning 3D art with Blender, building dynamic web applications
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