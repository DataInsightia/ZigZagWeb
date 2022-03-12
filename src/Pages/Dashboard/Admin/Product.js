import React from 'react'

function Product() {
  return (
    <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
      <div className="w-1/2 bg-white shadow-lg">
        <div  className="flex p-1">
                <div class="ml-auto">
                    <button className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">ADD</button>
                </div>
                {/* <div>
                    <h1>New Arrival</h1>
                    <div>#</div>
                </div>
                <div>
                    <h1>Display</h1>
                    <div>#</div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Product