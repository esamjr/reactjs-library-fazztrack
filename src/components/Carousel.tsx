import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';

const Carousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const flktyRef = useRef<Flickity | null>(null);
  
    useEffect(() => {
      if (carouselRef.current && !flktyRef.current) {
        flktyRef.current = new Flickity(carouselRef.current, {
          wrapAround: true,
        });
      }
      return () => {
        if (flktyRef.current) {
          flktyRef.current.destroy();
          flktyRef.current = null; // Clear when unmounting
        }
      };
    }, []);

  return (
    <div ref={carouselRef} className="carousel" style={{ marginTop: '20px' }}>
      <div className="carousel-cell">
        <img src="src/assets/dilan.png" alt="New Book 1" className="cover-book" loading="lazy" />
        <div className="caption primary-font">Dilan 1990</div>
      </div>
      <div className="carousel-cell">
        <img src="src/assets/d96eff85-ae75-4f56-bdfc-dd7a055e7400.png" alt="New Book 2" className="cover-book" loading="lazy" />
        <div className="caption primary-font">Ubur Ubur Lembur</div>
      </div>
      <div className="carousel-cell">
        <img src="src/assets/laskar.jpeg" alt="New Book 3" className="cover-book" loading="lazy" />
        <div className="caption primary-font">Laskar Pelangi</div>
      </div>
    </div>
  );
};

export default Carousel;
