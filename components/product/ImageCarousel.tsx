import { Carousel } from "@mantine/carousel";
import Image from "next/image";

interface IImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: IImageCarouselProps) {
  return (
    <Carousel
      sx={{ maxWidth: 400 }}
      mx="auto"
      withIndicators
      height={220}
      dragFree
      slideGap="md"
      align="start"
      styles={{
        indicator: {
          width: 30,
          height: 13,
          color: "red",
          transition: "width 250ms ease",
          "&[data-active]": {
            width: 90,
          },
        },
      }}
    >
      {images.map((image) => (
        <Carousel.Slide key={image}>
          <Image className="w-[400px] h-60" src={image} alt={title} fill />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
