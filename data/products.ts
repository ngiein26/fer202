export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    image: "/images/headphones.svg",
    description: "Premium wireless audio with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    category: "Audio",
  },
  {
    id: 2,
    name: "Ergonomic Mechanical Keyboard",
    image: "/images/keyboard.svg",
    description: "Customizable RGB mechanical keyboard with tactile switches and soft wrist rest.",
    price: 149.50,
    category: "Peripherals",
  },
  {
    id: 3,
    name: "Ultra-Wide Curved Monitor 34\"",
    image: "/images/monitor.svg",
    description: "Immersive 34-inch WQHD curved display with 144Hz refresh rate for ultimate productivity.",
    price: 599.00,
    category: "Displays",
  },
  {
    id: 4,
    name: "Smart Fitness Watch Pro",
    image: "/images/watch.svg",
    description: "Advanced health tracking, GPS, optical heart rate sensor, and 7-day battery life.",
    price: 199.99,
    category: "Wearables",
  },
  {
    id: 5,
    name: "Portable Studio Microphone",
    image: "/images/microphone.svg",
    description: "Broadcast-quality USB condenser microphone for crystal-clear podcasting and streaming.",
    price: 129.95,
    category: "Audio",
  },
  {
    id: 6,
    name: "Minimalist Leather Laptop Sleeve",
    image: "/images/sleeve.svg",
    description: "Handcrafted genuine leather sleeve with soft microfiber interior lining for 15-inch laptops.",
    price: 45.00,
    category: "Peripherals",
  },
  {
    id: 7,
    name: "4K Webcam Pro",
    image: "/images/camera.svg",
    description: "Crystal-clear 4K streaming webcam with auto-focus and built-in ring light for professional video calls.",
    price: 89.99,
    category: "Peripherals",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    image: "/images/speaker.svg",
    description: "360-degree surround sound speaker with 20-hour battery life and IP67 waterproof rating.",
    price: 79.95,
    category: "Audio",
  },
];
