import BookingItem from "../components/BookingItem";

const MyBookings = () => {
    return (  
        <section className="flex flex-col px-4 text-center">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <hr className="w-full self-center my-4" />
            <div className="flex self-center items-center justify-center border rounded-xl w-72 py-1 mb-4">
                <button className=" bg-whiterounded-xl px-1 w-[40%]">Upcoming</button>
                <button className="rounded-xl px-1 w-[40%]">History</button>
            </div>
            <BookingItem />
        </section>
    );
}

export default MyBookings;