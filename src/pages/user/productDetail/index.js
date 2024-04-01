import React, { useEffect, useState } from "react";
import "./style.scss";
import anhsanpham from "assets/user/image/product/thuoc1.jpg";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const [showMore, setShowMore] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <div className="container">
        <div className="product-detail-container">
          <div className="product-detail-left">
            <div className="product-image">
              <img src={anhsanpham} alt="Product" />
            </div>
          </div>
          <div className="product-detail-right">
            <h2 className="product-title">
              Viên uống Perfect White Jpanwell hỗ trợ làm đẹp da, giúp da trắng
              sáng (60 viên)
            </h2>
            <div className="product-price">1.790.000đ</div>
            <div className="product-quantity">
              <label htmlFor="quantity">Chọn số lượng : </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <p className="product-description">
              Viên uống làm đẹp da Perfect White JpanWell hỗ trợ làm đẹp da,
              giúp da trắng sáng, căng mịn. Hỗ trợ cải thiện các vết thâm nám,
              hạn chế lão hóa da. Giảm tác hại của tia cực tím cho da.
            </p>

            <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
          </div>
        </div>

        <div className="container-mota">
          <div className="container-text-mota">
            <h1>MÔ TẢ SẢN PHẨM</h1>
            <h2 className={showMore ? "show" : "hidden"}>
              Dưỡng chất mỗi ngày cho làn da tươi trẻ Nhật Bản vốn là đất nước
              luôn trân trọng tự nhiên từ những gì nhỏ nhặt nhất. Trong nghệ
              thuật dưỡng da của phụ nữ Nhật cũng đặc biệt tôn vinh vẻ đẹp vốn
              có của làn da - điểm tựa mạnh mẽ để phóng tác lên những sáng tạo
              mới trong công cuộc đi tìm vẻ đẹp hoàn mỹ. Perfect White chính là
              chìa khóa giải mã bí quyết làn da không tuổi của phụ nữ Nhật, mang
              lại vẻ đẹp trắng hồng, bừng kiêu hãnh từ làn da căng mịn tự nhiên
              không khuyết điểm. Viên uống làm đẹp da Perfect White JpanWell 60
              viên 2Với những thay đổi nội tiết tố theo thời gian, cùng với tác
              động ngoại cảnh, làn da mong manh của phụ nữ âm thầm thay đổi,
              ngày một yếu đi với những dấu hiệu lão hóa xuất hiện như nếp nhăn,
              đốm sạm nám, da khô căng thiếu ẩm,... Một nét đẹp tự nhiên, rạng
              ngời từ thần thái phải đến từ chính những thay đổi tích cực bên
              trong cơ thể. Bằng việc luyện tập thể dục thường xuyên, ăn nhiều
              rau xanh và thực phẩm sạch, xây dựng cuộc sống khoa học, bạn cần
              bổ sung thêm những dưỡng chất nuôi dưỡng và tái tạo làn da. Viên
              uống Perfect White nhập khẩu trực tiếp từ Nhật Bản, cung cấp dưỡng
              chất quý hiếm từ vỏ thông đỏ pháp, cùng với các thành phần thúc
              đẩy làn da tỏa sáng rạng ngời từ bên trong. Trắng hồng không tì
              vết Perfect White kìm hãm tình trạng tăng sinh melanin quá mức
              khiến da bị sạm nám, đốm nâu. Đồng thời cũng góp phần tái tạo máu
              và giúp da thuận lợi trong quá trình sản xuất tế bào mới để cải
              thiện sắc tố da, giúp làn da đều màu và nuôi dưỡng sắc da trắng
              sáng tự nhiên từ bên trong. Giảm tác hại từ tia UV Perfect White
              như một dưỡng chất chống nắng nội sinh, tạo màng chắn bảo vệ da
              trước tác động của tia UV từ ánh nắng mặt trời, ngăn không cho tia
              UV tác động trực tiếp vào da gây tích tụ sắc tố melanin dư thừa
              dẫn đến da khô nhăn và xuất hiện các đốm nâu. Hỗ trợ chống lão hóa
              da từ gốc Lão hóa là một quy luật tự nhiên, nhưng quá trình tiến
              dần đến lão hóa vẫn có thể được làm chậm nếu hiểu được nhu cầu của
              làn da. Perfect White tăng cường dinh dưỡng cần thiết cho một làn
              da khỏe mạnh, tăng khả năng chống chịu của da trước các tác động
              gây hại của môi trường. Bên cạnh đó, viên uống cung cấp các chất
              giúp cải thiện các dấu hiệu lão hóa da. Chiết xuất vỏ thông đỏ có
              thể chống oxy hóa và chống viêm gấp 20 lần vitamin C và 50 lần
              vitamin E. Đây cũng là tiền chất kích thích gần 1 triệu tế bào sản
              sinh collagen lấp đầy các rãnh nếp nhăn trên bề mặt, tái tạo tế
              bào mới; thúc đẩy axit hyaluronic hoạt động tốt hơn nhằm bù nước
              cho da, giúp da căng mịn, ẩm mượt, đều màu, thay thế các tế bào da
              chết bị sạm nám, nhiều nếp nhăn. Viên uống làm đẹp da Perfect
              White JpanWell 60 viên 3 Làn da căng mịn, hồng hào tự nhiên chính
              là chìa khóa cho nét đẹp vĩnh cửu mà mọi cô gái đều mong muốn sở
              hữu. Đó cũng chính là mục tiêu mà những nhà khoa học về làn da của
              Perfect White Nhật Bản luôn theo đuổi nghiên cứu để hóa phép thần
              kỳ cho làn da phụ nữ, tạo nên chuẩn mực của nét đẹp hiện đại - làn
              da đầy sinh khí, rạng ngời không tì vết. Perfect White được nhập
              khẩu chính thức bởi JpanWell. Với thông điệp 'Made in Japan',
              JpanWell mong muốn tạo sự uy tín và niềm tin chất lượng trong lòng
              khách hàng. Cam kết cung ứng cho thị trường Việt Nam dòng sản phẩm
              được chọn lọc rất kỹ lưỡng và sản xuất tại Nhật Bản. Các sản phẩm
              của JpanWell đều được Bộ Y tế Việt Nam kiểm định chất lượng, cấp
              giấy chứng nhận được phép nhập khẩu và phân phối. Nuôi dưỡng làn
              da mỗi ngày với Perfect White - Tự tin tỏa sáng cùng vẻ đẹp tự
              nhiên tươi trẻ. Thành phần của Viên uống Perfect White Thành phần
              cho 2 viên Thông tin thành phần Hàm lượng Collagen cá 114.28mg
              L-Cystine 22.86mg Hyaluronic acid 2mg Tá dược vừa đủ bột cà rốt
              57.14mg inlulin 57.14mg Vitamin C 45.71mg Elastin 11.43mg bột hoa
              cúc tím 11.43mg chiết xuất bột vỏ thông đỏ 45.71mg Collagen cá:
              Góp phần củng cố cấu trúc da, giúp da tươi trẻ, căng mịn và có độ
              đàn hồi tốt. Bột cà rốt: Chứa beta carotene, một dưỡng chất quan
              trọng cho sức khỏe làn da. Nó có tác dụng bảo vệ các tế bào da
              khỏi tác hại của tia UV, ngăn tình trạng da khô, da nhăn. Vỏ thông
              đỏ (Pinus pinaster/Maritime Pine): Kích thích sản sinh collagen và
              tăng cường ẩm cho da, góp phần chống lão hóa da, giúp da tươi trẻ.
              Vitamin C: Có đặc tính chống oxy hóa, ngăn ngừa lão hóa và cải
              thiện sắc tố da, hạn chế sự xuất hiện của các đốm nâu trên da.
              L-cystine: Chống gốc tự do gây lão hóa da, tăng cường chuyển hóa
              trên da. Hỗ trợ điều trị tình trạng sạm da do nhiều nguyên nhân.
              Elastin: Cùng với collagen, elastin tạo thành một liên kết bền
              vững dưới da, giúp da khỏe mạnh, tăng tính đàn hồi và săn chắc của
              da, hạn chế nếp nhăn xuất hiện. Axit hyaluronic: Chức năng chính
              của nó là giữ nước, giúp cho các tế bào da luôn đủ ẩm. Khi da đủ
              độ ẩm, hàng rào bảo vệ da tự nhiên sẽ trở nên khỏe mạnh hơn, chống
              lại các nhân tố gây hại tấn công vào da. Công dụng của Viên uống
              Perfect White Viên uống làm đẹp da Perfect White JpanWell hỗ trợ
              làm đẹp da, giúp da trắng sáng, căng mịn. Hỗ trợ cải thiện các vết
              thâm nám. Hạn chế lão hóa da. Giảm tác hại của tia cực tím cho da.
              Cách dùng Viên uống Perfect White Cách dùng Uống 2 viên/ngày với
              nước nguội hoặc nước ấm. Đối tượng sử dụng Perfect White JpanWell
              dùng trong những trường hợp: Người muốn cải thiện và làm đẹp làn
              da. Người muốn tăng cường sức khỏe cho làn da. Người thường xuyên
              tiếp xúc với ánh nắng mặt trời. Tác dụng phụ Chưa có thông tin về
              tác dụng phụ của sản phẩm. Lưu ý Không dùng cho người mẫn cảm với
              bất kỳ thành phần nào của sản phẩm. Không dùng quá liều khuyến cáo
              hằng ngày. Sản phẩm này không phải là thuốc và không có tác dụng
              thay thế thuốc chữa bệnh. Đọc kỹ hướng dẫn sử dụng trước khi dùng.
              Bảo quản Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực
              tiếp từ mặt trời. Để xa tầm tay trẻ em.
            </h2>
            <div className="btnXemthem">
              <button
                className="btnXemthem_link"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Rút gọn" : "Xem thêm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
