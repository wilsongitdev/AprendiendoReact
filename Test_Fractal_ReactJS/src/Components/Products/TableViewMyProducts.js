import { Container } from "@mui/system";
import TableMyProducts from "./TableMyProducts";



export default function TableViewMyProducts() {
    return (
        <section>
            <div className="padded titlebgcolor">
                <Container maxWidth="sm" style={{"textAlign": "center"}}>
                    <h1>My Products</h1>
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"textAlign": "center"}}>
                    <TableMyProducts/>
                </Container>
            </div>
        </section>
    );
}