package ua.com.andromeda.common;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import ua.com.andromeda.ticket.Ticket;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class QRCodeGenerator {
    private static final int WHITE = 0x000000;
    private static final int BLACK = 0xFFFFFF;

    public List<ByteArrayOutputStream> generateQRCodesBytesArray(List<Ticket> tickets, int width, int height) {
        return tickets.stream()
                .map(ticket -> generateQRCode(ticket.getRow(), ticket.getSeat(), width, height))
                .toList();

    }

    @SneakyThrows
    private ByteArrayOutputStream generateQRCode(int row, int seat, int width, int height) {
        String textToDecode = row + " row, " + seat + " seat";
        BitMatrix bitMatrix = new MultiFormatWriter().encode(
                textToDecode,
                BarcodeFormat.QR_CODE,
                width,
                height,
                getQRCodeHints()
        );
        BufferedImage qrCodeImage = getQrCodeImage(width, height, bitMatrix);
        ByteArrayOutputStream qrCodeBytes = new ByteArrayOutputStream();
        ImageIO.write(qrCodeImage, "PNG", qrCodeBytes);
        return qrCodeBytes;
    }

    private static BufferedImage getQrCodeImage(int width, int height, BitMatrix bitMatrix) {
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                image.setRGB(i, j, bitMatrix.get(i, j) ? WHITE : BLACK);
            }
        }
        return image;
    }

    private Map<EncodeHintType, Object> getQRCodeHints() {
        Map<EncodeHintType, Object> hints = new EnumMap<>(EncodeHintType.class);
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        return hints;
    }
}
