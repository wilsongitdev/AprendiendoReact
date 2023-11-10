import { Container } from "@mui/system";
import TableMyOrders from "./TableMyOrders";

export default function TableViewMyOrders() {
    return (
        <section>
            <div className="padded titlebgcolor">
                <Container maxWidth="sm" style={{"textAlign": "center"}}>
                    <h1>My Orders</h1>
                </Container>
            </div>
            
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"textAlign": "center"}}>
                    <TableMyOrders/>
                </Container>
            </div>
        </section>
    );
}