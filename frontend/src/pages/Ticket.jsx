import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getTicket, closeTicket, reset } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";

const Ticket = () => {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));

        //eslint-disable-next-line
    }, [isError, message, ticketId]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket Closed");
        navigate("/tickets");
    };
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong</h3>;
    }
    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted:{" "}
                    {new Date(ticket.createdAt).toLocaleString("en-us")}
                </h3>
                <h3>Product: {ticket.product}</h3>

                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status !== "closed" && (
                <button
                    onClick={onTicketClose}
                    className="btn btn-block btn-danger"
                >
                    Close Ticket
                </button>
            )}
        </div>
    );
};

export default Ticket;