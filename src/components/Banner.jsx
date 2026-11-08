import Carousel from 'react-multi-carousel';
import { Link } from 'react-router';
import 'react-multi-carousel/lib/styles.css';

const Banner = () => {
    // ✅ راه‌حل: بررسی اینکه آیا Carousel یک آبجکت است یا خود کامپوننت
    const RMCarousel = Carousel.default ? Carousel.default : Carousel;

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <div className='w-full lg:mt-6'>
            <div className='w-[90%] max-w-[1400px] mx-auto'>
                <div className='w-full flex flex-wrap lg:gap-8'>
                    <div className='w-full z-10'>
                        <div className='my-8 '>
                            {/* ✅ استفاده از متغیر جدید RMCarousel */}
                            <RMCarousel
                                autoPlay={true}
                                infinite={true}
                                arrows={true}
                                showDots={true}
                                responsive={responsive}
                            >
                                {[1, 2, 3, 4, 5, 6].map((img, i) => (
                                    <Link key={i} to='#' className="block">
                                        <img 
                                            src={`/images/banner/${img}.jpg`} 
                                            alt={`banner-${img}`} 
                                            className="w-full object-cover rounded-md" 
                                        />
                                    </Link>
                                ))}
                            </RMCarousel>        
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default Banner;