-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2025 at 04:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_clothing_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(7, 6, NULL, '2025-12-22 01:51:50', '2025-12-22 01:51:50'),
(8, 7, NULL, '2025-12-22 12:33:16', '2025-12-22 12:33:16'),
(9, 8, NULL, '2025-12-23 00:18:03', '2025-12-23 00:18:03'),
(10, 9, NULL, '2025-12-23 16:13:54', '2025-12-23 16:13:54');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `product_id`, `color`, `size`, `quantity`) VALUES
(4, 9, 4, 'Default', 'M', 4),
(11, 7, 7, 'Default', 'M', 1),
(12, 7, 6, 'Default', 'M', 1),
(13, 7, 5, 'Default', 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'Women', 0, '2025-12-01 23:33:32', '2025-12-01 23:33:32'),
(2, 'Men', 0, '2025-12-01 23:33:32', '2025-12-01 23:33:32'),
(3, 'New', 0, '2025-12-01 23:33:32', '2025-12-01 23:33:32');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `full_content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `title`, `content`, `image`, `created_at`, `full_content`) VALUES
(1, 'Mùa hè rực rỡ với bộ sưu tập mới', 'Khám phá những mẫu thiết kế thoáng mát, năng động cho mùa hè này...', 'static/image/bl-1.png', '2025-11-20 03:00:00', 'Chào đón mùa hè 2025 rực rỡ! Trong bộ sưu tập lần này, chúng tôi mang đến những chất liệu vải Linen thoáng mát, thấm hút mồ hôi tốt nhất.\n\nĐiểm nhấn là các họa tiết nhiệt đới (Tropical) đầy màu sắc, kết hợp với phom dáng Oversize năng động. Không chỉ phù hợp cho những chuyến du lịch biển, các thiết kế này còn rất tiện dụng để mặc đi cafe hay dạo phố cuối tuần.\n\nĐừng quên ghé cửa hàng để nhận voucher giảm giá 20% cho 100 khách hàng đầu tiên nhé!'),
(2, 'Giảm giá 50% tất cả áo khoác', 'Cơ hội mua sắm thả ga không lo về giá. Áp dụng đến hết tháng...', 'static/image/bl-2.png', '2025-11-21 02:30:00', 'Tin vui cho các tín đồ săn sale! Từ ngày 21/11 đến hết tháng, toàn bộ các mẫu áo khoác gió, áo bomber và hoodie sẽ được giảm giá 50%.\n\nĐây là cơ hội tuyệt vời để bạn chuẩn bị cho mùa đông sắp tới. Các mẫu áo khoác năm nay được cải tiến với công nghệ chống nước nhẹ và giữ nhiệt tốt hơn.\n\nLưu ý: Chương trình áp dụng cho cả mua online và tại cửa hàng.'),
(3, 'Xu hướng thời trang 2026', 'Cùng nhìn trước những phong cách sẽ lên ngôi trong năm tới...', 'static/image/bl-3.png', '2025-11-22 08:00:00', 'Năm 2026 hứa hẹn sẽ là sự lên ngôi của phong cách Retro Future - sự kết hợp giữa nét cổ điển thập niên 90 và hơi thở công nghệ tương lai.\n\nChúng ta sẽ thấy sự trở lại của quần ống loe, áo croptop neon nhưng được phối cùng các phụ kiện kim loại (metallic) sắc sảo.\n\nHãy cùng chờ đón những thiết kế demo đầu tiên sẽ được chúng tôi ra mắt vào tháng sau nhé!');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(12,2) DEFAULT NULL,
  `status` enum('pending','confirmed','shipped','delivered','canceled') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `shipping_address`, `order_date`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, '139 Tam Trinh', '2025-12-22 02:16:20', 239.00, 'pending', '2025-12-22 02:16:20', '2025-12-22 02:16:20'),
(2, 6, 'Đại học Bách Khoa Hà Nội', '2025-12-23 13:22:56', 208.00, 'pending', '2025-12-23 13:22:56', '2025-12-23 13:22:56'),
(3, 7, 'Hà Nội', '2025-12-23 13:45:52', 268.00, 'pending', '2025-12-23 13:45:52', '2025-12-23 13:45:52'),
(4, 9, 'Hà Nội', '2025-12-23 16:15:05', 188.00, 'pending', '2025-12-23 16:15:05', '2025-12-23 16:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`detail_id`, `order_id`, `product_id`, `color`, `size`, `quantity`, `price`, `created_at`) VALUES
(1, 1, 3, 'Default', 'M', 1, 89.00, '2025-12-22 02:16:20'),
(2, 1, 4, 'Default', 'M', 1, 150.00, '2025-12-22 02:16:20'),
(3, 2, 15, 'Default', 'M', 1, 59.00, '2025-12-23 13:22:56'),
(4, 2, 13, 'Default', 'M', 1, 149.00, '2025-12-23 13:22:56'),
(5, 3, 10, 'Default', 'M', 1, 189.00, '2025-12-23 13:45:52'),
(6, 3, 9, 'Default', 'M', 1, 79.00, '2025-12-23 13:45:52'),
(7, 4, 3, 'Default', 'M', 1, 89.00, '2025-12-23 16:15:05'),
(8, 4, 1, 'Default', 'M', 1, 99.00, '2025-12-23 16:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `category_slug` varchar(50) DEFAULT NULL,
  `product_name` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `rating` float DEFAULT 5,
  `material` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `category_slug`, `product_name`, `price`, `image`, `tag`, `rating`, `material`, `color`, `size`, `created_at`, `updated_at`, `description`) VALUES
(1, 1, 'women', 'Half Running Set', 99.00, 'static/image/1.jpg', 'Sale', 4.5, NULL, 'Red', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Bộ đồ chạy bộ nửa người thoáng khí, chất liệu co giãn tốt, thấm hút mồ hôi, thích hợp cho các hoạt động thể thao ngoài trời.'),
(2, 1, 'women', 'Formal Men Lowers', 129.00, 'static/image/2.jpg', 'New', 5, NULL, 'Blue', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Quần âu nam dáng đứng, vải tuyết mưa cao cấp không nhăn, mang lại vẻ lịch lãm và chuyên nghiệp cho môi trường công sở.'),
(3, 1, 'women', 'Half Running Suit', 89.00, 'static/image/3.jpg', 'Sale', 4.5, NULL, 'Black', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Bộ suit thể thao năng động, thiết kế hiện đại, ôm dáng nhưng vẫn thoải mái, hỗ trợ tối đa khi vận động mạnh.'),
(4, 1, 'women', 'Half Fancy Lady Dress', 150.00, 'static/image/4.jpg', 'Hot', 4.5, NULL, 'Pink', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Đầm nữ thiết kế cách điệu nửa người, phong cách sang trọng với đường cắt may tinh tế, tôn lên vẻ đẹp quý phái.'),
(5, 1, 'women', 'Flix Flox Jeans', 99.00, 'static/image/5.jpg', 'Sale', 4.5, NULL, 'Blue', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Quần Jeans Flix Flox phong cách trẻ trung, bụi bặm. Chất liệu denim bền bỉ và màu sắc thời thượng, dễ phối đồ.'),
(6, 1, 'women', 'Fancy Salwar Suits', 129.00, 'static/image/6.jpg', 'Hot', 4.5, NULL, 'Red', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Bộ trang phục Salwar Suits truyền thống cách tân với họa tiết tinh xảo, màu sắc bắt mắt và chất vải mềm mại, thoáng mát.'),
(7, 1, 'women', 'Printed Straight Kurta', 99.00, 'static/image/7.jpg', 'Sale', 4.5, NULL, 'Yellow', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Áo Kurta dáng suông in họa tiết độc đáo, mang lại vẻ ngoài thanh lịch, đậm chất văn hóa nhưng vẫn rất hiện đại.'),
(8, 1, 'women', 'Collot Full Dress', 119.00, 'static/image/8.jpg', 'Sale', 5, NULL, 'Purple', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Đầm dài Collot full set, chất liệu lụa mềm mại, thiết kế bay bổng lãng mạn, hoàn hảo cho các sự kiện đặc biệt.'),
(9, 2, 'men', 'Casual Cotton Shirt', 79.00, 'static/image/9.jpg', 'New', 4.5, NULL, 'White', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:42', 'Áo sơ mi cotton 100% thoáng mát, form rộng thoải mái, là lựa chọn hàng ngày hoàn hảo khi phối với quần jeans hoặc kaki.'),
(10, 2, 'men', 'Elegant Evening Gown', 189.00, 'static/image/10.jpg', 'Hot', 5, NULL, 'Black', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Váy dạ hội lộng lẫy, thiết kế ôm sát tôn dáng cùng những đường cắt xẻ quyến rũ, giúp bạn tỏa sáng trong mọi bữa tiệc.'),
(11, 2, 'men', 'Denim Jacket', 89.00, 'static/image/11.jpg', 'Sale', 4.5, NULL, 'Blue', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Áo khoác Denim bò cá tính, form chuẩn, chất vải dày dặn. Món đồ \"must-have\" để tạo nên phong cách đường phố cực chất.'),
(12, 1, 'men', 'Summer Sundress', 69.00, 'static/image/12.jpg', 'New', 4.5, NULL, 'Red', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Váy mùa hè Summer Sundress nhẹ nhàng, họa tiết hoa tươi sáng, chất vải mát lạnh lý tưởng cho những chuyến đi biển.'),
(13, 2, 'men', 'Classic Blazer', 149.00, 'static/image/13.jpg', 'Hot', 4.5, NULL, 'Grey', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Áo Blazer cổ điển, đường cắt may sắc sảo, mang lại vẻ ngoài chuyên nghiệp và chững chạc, phù hợp đi làm hoặc gặp gỡ đối tác.'),
(14, 2, 'men', 'Vintage Sweater', 79.00, 'static/image/14.jpg', 'Sale', 4.5, NULL, 'Brown', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Áo len Vintage ấm áp, họa tiết quả trám cổ điển, gợi nhớ phong cách thời trang thập niên cũ đầy hoài niệm.'),
(15, 2, 'men', 'Athletic Leggings', 59.00, 'static/image/15.jpg', 'New', 4.5, NULL, 'Black', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Quần Legging thể thao ôm sát, co giãn 4 chiều, hỗ trợ tối đa cho các bài tập Gym, Yoga hay chạy bộ.'),
(16, 2, 'men', 'Wool Overcoat', 219.00, 'static/image/16.jpg', 'Hot', 4.5, NULL, 'Black', NULL, '2025-12-02 00:09:19', '2025-12-23 01:18:43', 'Áo khoác dạ lông cừu Wool Overcoat giữ ấm cực tốt, kiểu dáng măng-tô sang trọng, đẳng cấp cho những ngày đông lạnh giá.');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comments` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `product_id`, `rating`, `comments`, `created_at`) VALUES
(1, 6, NULL, 4, 'sản phẩm khá tốt, sẽ ủng hộ thêm', '2025-12-22 02:19:47'),
(2, 7, NULL, 5, 'đánh giá mang tính chất nhận xu', '2025-12-22 12:33:47'),
(4, 7, NULL, 5, 'sản phẩm tốt', '2025-12-23 13:45:17'),
(5, 9, NULL, 1, 'thêm chức năng xem và chỉnh sửa thông tin ng dùng \n\n', '2025-12-23 16:18:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('customer','admin','visitor') DEFAULT 'customer',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `phone`, `address`, `role`, `created_at`, `updated_at`) VALUES
(6, 'truongminhtam1', 'minhtam9a3vghy@gmail.com', 'truongminhtam1', NULL, NULL, 'admin', '2025-12-01 23:49:17', '2025-12-23 23:39:01'),
(7, 'nguyenminhtuan1', 'tuandz@gmail.com', 'tuandepzai', NULL, NULL, 'customer', '2025-12-03 15:38:37', '2025-12-03 15:38:37'),
(8, 'linhhn', 'linhhntct@gmail.com', '123456', NULL, NULL, 'customer', '2025-12-03 15:42:05', '2025-12-03 15:42:05'),
(9, 'tuantm', 'tuantm@gmail.com', 'trinhminhtuan', NULL, NULL, 'customer', '2025-12-23 16:13:26', '2025-12-23 16:13:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cart_fk_2` (`product_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD UNIQUE KEY `unique_user_product_review` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_fk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
