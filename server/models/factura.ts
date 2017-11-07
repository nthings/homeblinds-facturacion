import * as mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
        cliente: mongoose.Schema.Types.Mixed,
        formadepago: String,
        conceptos: [
            {
                cantidad: Number,
                unidad: String,
                descripcion: String,
                valorunitario: Number,
                importe: Number,
            }
        ],
        subtotal: Number,
        iva: Number,
        totalneto: Number
    },
    {
        timestamps: true
    });

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
