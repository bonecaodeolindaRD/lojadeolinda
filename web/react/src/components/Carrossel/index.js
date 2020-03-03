import React, { Component } from 'react';
import './style.css';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

export default class Carrossel extends Component {

    constructor(props) {
		super(props);
        this.state = { activeIndex: 0,
            items : [
                {
                    src: 'https://picsum.photos/1200/400',
                    altText: 'Slide 1',
                    caption: 'Slide 1'
                },
                {
                    src: 'https://picsum.photos/1200/400',
                    altText: 'Slide 2',
                    caption: 'Slide 2'
                },
                {
                    src: 'https://picsum.photos/1200/400',
                    altText: 'Slide 3',
                    caption: 'Slide 3'
                }
            ] };
    }
    
    onExiting = () => {
		this.animating = true;
	}

	onExited = () => {
		this.animating = false;
	}

	next = () => {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous = () =>  {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex  = (newIndex) =>  {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

    render() {

        const { activeIndex } = this.state;

		const slides = this.state.items.map((item) => {
			return (
				<CarouselItem
					onExiting={this.onExiting}
					onExited={this.onExited}
					key={item.src}
				>
					<img src={item.src} alt={item.altText} className="imagem" />
					<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
				</CarouselItem>
			);
        });
        
        return (
				<Carousel
					activeIndex={activeIndex}
					next={this.next}
					previous={this.previous}
					className="mb-5"
				>
					<CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
					{slides}
					<CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
					<CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
				</Carousel>
		);
    }
}
