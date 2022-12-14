import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MyOrders = () => {

    const {user} = useContext(AuthContext)

    const url = `https://phone-server-side.vercel.app/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email ],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

console.log( 'booking Data',bookings);


    return (
        <div>
            <h2> My orders</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Resale Price</th>
        <th>Use</th>
        <th>Location</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      
      {
        bookings?.map((booking, i) => <tr key={booking._id} className="hover">
        <th>{i+1}</th>
        <td>{booking.product}</td>
        <td>{booking.resalePrice}$</td>
        <td>{booking.use} Years</td>
        <td>{booking.location}</td>
        <td>
          {
            booking.resalePrice && !booking.paid &&
             <Link to={`/dashboard/payment/${booking._id}`}>
             <button className='btn btn-primary btn-sm'>Pay</button>
             </Link>
          }
          {
            booking.resalePrice && booking.paid && <span className='text-primary '>Paid</span>
          }
          </td>
      </tr>
      )
      }
    </tbody>
  </table>
</div>

        </div>
    );
};

export default MyOrders;