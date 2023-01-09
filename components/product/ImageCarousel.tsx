import { Carousel } from "@mantine/carousel";
import Image from "next/image";

interface IImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: IImageCarouselProps) {
  return (
    <div className="w-[400px] h-[250px]">
      <Carousel
        sx={{ maxWidth: 400 }}
        mx="auto"
        withIndicators
        height={250}
        dragFree
        slideGap="md"
        align="start"
        styles={{
          container: {},
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
            <Image src={image} alt={title} fill />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
