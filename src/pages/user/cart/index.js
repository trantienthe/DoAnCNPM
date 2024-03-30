import React from 'react'
import "./style.scss"

const Cart = () => {
  return (
    <>
      <div className='container'>
        <div className='cart'>
          <div className='cart-left'>
            <table className='cart-left-table'>
              <thread>
                <tr>
                  <td>Checkbox</td>
                  <td>Ảnh</td>
                  <td>Giá thành</td>
                  <td>Số lượng</td>
                  <td>Hỗ trợ</td>
                </tr>
              </thread>
              <tbody>
                <tr>
                  <td>
                    <input type='checkbox'></input>
                  </td>
                  <td>
                    <img src='' alt=''/> Tên thuốc
                  </td>
                  <td>
                    Giá thuốc
                  </td>
                  <td>
                    <input type="number" value="1" min="1"/>
                  </td>
                  <td>
                    <button>Delete</button>
                    <button>Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cart-right'>
            phải
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;