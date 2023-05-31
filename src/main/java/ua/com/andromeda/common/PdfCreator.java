package ua.com.andromeda.common;

import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.WebColors;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.BorderRadius;
import com.itextpdf.layout.properties.Leading;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.ticket.Ticket;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Component
public class PdfCreator {
    @SneakyThrows
    public String createTicketsFile(List<Ticket> tickets, List<ByteArrayOutputStream> qrCodesBytesArray) {
        String fileId = UUID.randomUUID().toString();
        String fileName = "tickets-" + fileId + ".pdf";
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(fileName));

        // Create a document
        Document document = new Document(pdfDocument);
        Cell firstColumn = new Cell().setBorder(Border.NO_BORDER);
        ImageData logoData = ImageDataFactory.create(getLogoFromResource());
        Image logo = new Image(logoData);
        firstColumn.add(logo);
        Session session = tickets.get(0).getSession();
        LocalDateTime startAt = session.getStartAt();
        Paragraph title = new Paragraph(session.getFilm().getTitle());
        PdfFont font = PdfFontFactory.createFont("Papyrus.ttf");
        title.setFont(font);
        title.setFontSize(26);
        firstColumn.add(title);

        // Create a nested element structure for the date paragraph
        Paragraph dateParagraph = getParagraph("Date", startAt.format(DateTimeFormatter.ISO_DATE));
        Paragraph timeParagraph = getParagraph("Time", startAt.format(DateTimeFormatter.ISO_LOCAL_TIME));
        Paragraph hallParagraph = getParagraph("Hall", "Hall №" + session.getHall().getNumber());
        firstColumn.add(dateParagraph)
                .add(timeParagraph)
                .add(hallParagraph)
                .setBorderRight(new SolidBorder(WebColors.getRGBColor("#A09696"), 1));
        // Add content to the second column
        Cell secondColumn = new Cell().setBorder(Border.NO_BORDER);
        // Add a list of tickets (assuming you have a list of Ticket objects)
        Table table = new Table(3); // Table with 3 columns
        Border noBorder = Border.NO_BORDER;
        table.setWidth(UnitValue.createPercentValue(100));

        for (int i = 0; i < tickets.size(); i++) {
            Cell rowCell = new Cell();
            rowCell.add(getParagraph("Row", String.valueOf(tickets.get(i).getRow()))).setBorder(noBorder);
            Cell seatCell = new Cell();
            seatCell.add(getParagraph("Seat", String.valueOf(tickets.get(i).getSeat()))).setBorder(noBorder);
            Cell qrCodeCell = new Cell();
            Image qrCode = new Image(ImageDataFactory.create(qrCodesBytesArray.get(i).toByteArray()));
            qrCode.setHeight(110);
            qrCodeCell.add(qrCode).setBorder(noBorder);

            table.setMarginLeft(25)
                    .addCell(rowCell)
                    .addCell(seatCell)
                    .addCell(qrCodeCell);
        }

        secondColumn.add(table);

        Table container = new Table(2)
                .addCell(firstColumn).setWidth(UnitValue.createPercentValue(110))
                .addCell(secondColumn);

        document.add(container)
                .close();
        return fileName;
    }

    private static Paragraph getParagraph(String label, String content) {
        Div dateContainer = new Div()
                .setBorder(new SolidBorder(WebColors.getRGBColor("#A09696"), 2, 0.5f))
                .setBorderRadius(new BorderRadius(10))
                .setMarginTop(20)
                .setPaddingLeft(20)
                .setPaddingRight(20);
        Paragraph dateLabel = new Paragraph(label)
                .setTextAlignment(TextAlignment.CENTER)
                .setMultipliedLeading(Leading.FIXED)
                .setBold()
                .setPaddingLeft(10)
                .setPaddingRight(10)
                .setBackgroundColor(WebColors.getRGBColor("#FFF"))
                .setRelativePosition(0, -15, 0, 0);
        Div labelContainer = new Div();
        labelContainer.add(dateLabel);
        Paragraph labelDateParagraph = new Paragraph().add(dateLabel);
        Paragraph dateValueParagraph = new Paragraph(content)
                .setTextAlignment(TextAlignment.CENTER)
                .setRelativePosition(0, -15, 0, 0)
                .setFontSize(20);
        dateContainer.add(labelDateParagraph)
                .add(dateValueParagraph);

        return new Paragraph().add(dateContainer);
    }

    private URL getLogoFromResource() throws IOException {
        Resource resource = new ClassPathResource("static/logo.png");
        return resource.getFile().toURI().toURL();
    }
}
