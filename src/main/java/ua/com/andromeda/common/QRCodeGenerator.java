package ua.com.andromeda.common;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.stereotype.Component;
import ua.com.andromeda.ticket.Ticket;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class QRCodeGenerator {

    public List<ByteArrayOutputStream> generateQRCodesBytesArray(List<Ticket> tickets, int width, int height) {
        List<String> textsToDecode = tickets.stream()
                .map(t -> t.getRow() + " row, " + t.getSeat() + " seat; ")
                .toList();

        return textsToDecode.stream()
                .map(text -> {
                    try {
                        BitMatrix bitMatrix = new MultiFormatWriter().encode(
                                text,
                                BarcodeFormat.QR_CODE,
                                width,
                                height,
                                getQRCodeHints()
                        );
                        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                        for (int x = 0; x < width; x++) {
                            for (int y = 0; y < height; y++) {
                                image.setRGB(x, y, bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF);
                            }
                        }
                        ByteArrayOutputStream qrCode = new ByteArrayOutputStream();
                        ImageIO.write(image, "PNG", qrCode);
                        return qrCode;
                    } catch (WriterException | IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();

    }

    private java.util.Map<EncodeHintType, Object> getQRCodeHints() {
        java.util.Map<EncodeHintType, Object> hints = new java.util.EnumMap<>(EncodeHintType.class);
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        return hints;
    }
}
