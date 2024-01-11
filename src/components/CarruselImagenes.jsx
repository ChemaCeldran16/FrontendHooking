import { Carousel } from '@material-tailwind/react';

export function CarruselImagenes({ images }) {
  return (
    <div className='w-11/12 mx-auto'> 
      <Carousel
        className='rounded-xl overflow-hidden'
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {images.map((imageUrl, index) => (
          <div key={index} className='w-full'>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className='w-11/12 h-48 mx-auto object-fill rounded-xl md:h-64' 
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
