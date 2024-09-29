'use client';

import React, { useEffect, useRef } from 'react';
import './InteractiveBackground.scss'; // Ensure your styles are imported

const InteractiveBackground = () => {
  const interBubbleRef = useRef<HTMLDivElement>(null);
  const backgroundBubblesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const interBubble = interBubbleRef.current!;
    let curX = window.innerWidth / 2; // Start from the center of the screen
    let curY = window.innerHeight / 2;
    let tgX = curX;
    let tgY = curY;

    function move() {
      // Update mouse-following bubble position with adjusted offset
      const offsetX = interBubble.offsetWidth / 2 - 10; // Adjust -10px to move more to the left
      const offsetY = interBubble.offsetHeight / 2 - 10; // Adjust -10px to move more up

      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX - offsetX)}px, ${Math.round(curY - offsetY)}px)`;

      // Check interaction with each background bubble
      backgroundBubblesRef.current.forEach((bubble) => {
        const bubbleRect = bubble.getBoundingClientRect();
        const interBubbleRect = interBubble.getBoundingClientRect();

        // Calculate the distance between the centers of the two bubbles
        const dx =
          (interBubbleRect.left + interBubbleRect.width / 2) -
          (bubbleRect.left + bubbleRect.width / 2);
        const dy =
          (interBubbleRect.top + interBubbleRect.height / 2) -
          (bubbleRect.top + bubbleRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Define the radius of each bubble (assuming they are circles)
        const interBubbleRadius = interBubbleRect.width / 2;
        const bubbleRadius = bubbleRect.width / 2;
        const minDistance = interBubbleRadius + bubbleRadius;

        // Check for collision
        if (distance < minDistance + 50) { // Adding 50 as a buffer for interaction range
          const angle = Math.atan2(dy, dx);
          const force = (minDistance - distance) / minDistance; // The closer, the stronger the push

          // Calculate the new position for the background bubble
          const newX = bubble.offsetLeft + Math.cos(angle) * force * 10;
          const newY = bubble.offsetTop + Math.sin(angle) * force * 10;

          // Update the position of the background bubble
          bubble.style.transform = `translate(${newX}px, ${newY}px)`;
        }
      });

      requestAnimationFrame(move);
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    move();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <div className="gradients-container">
        <div className="g1" ref={(el) => el && backgroundBubblesRef.current.push(el)}></div>
        <div className="g2" ref={(el) => el && backgroundBubblesRef.current.push(el)}></div>
        <div className="g3" ref={(el) => el && backgroundBubblesRef.current.push(el)}></div>
        <div className="g4" ref={(el) => el && backgroundBubblesRef.current.push(el)}></div>
        <div className="g5" ref={(el) => el && backgroundBubblesRef.current.push(el)}></div>
      </div>
      <div className="interactive" ref={interBubbleRef}></div>
    </div>
  );
};

export default InteractiveBackground;
