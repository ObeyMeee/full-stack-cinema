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
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Component
public class PdfCreator {
    private static final String LOGO_RESOURCE_PATH = "static/logo.png";
    private static final String FONT_PATH = "Papyrus.ttf";
    private static final int TITLE_FONT_SIZE = 26;
    private static final int VALUE_FONT_SIZE = 20;
    private static final int QR_CODE_HEIGHT = 110;
    private static final int TABLE_COLUMNS = 3;
    private static final float LABEL_CONTAINER_RELATIVE_POSITION_Y = -15;
    private static final int LABEL_CONTAINER_PADDING_HORIZONTAL = 10;
    private static final String LABEL_CONTAINER_BACKGROUND_COLOR = "#FFF";
    private static final float FULL_CONTAINER_MARGIN_TOP = 20;
    private static final int FULL_CONTAINER_PADDING_HORIZONTAL = 20;
    private static final float TABLE_MARGIN_LEFT = 25;

    @SneakyThrows
    public File createTicketsFile(List<Ticket> tickets, List<ByteArrayOutputStream> qrCodesBytesArray) {
        String fileId = UUID.randomUUID().toString();
        String fileName = "tickets-" + fileId + ".pdf";
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(fileName));
        Document document = new Document(pdfDocument);
        Cell sessionInfoColumn = getSessionInfo(tickets);
        Cell ticketsInfoColumn = getAllTicketsInfo(tickets, qrCodesBytesArray);
        Table container = new Table(2)
                .addCell(sessionInfoColumn)
                .setWidth(UnitValue.createPercentValue(110))
                .addCell(ticketsInfoColumn);
        document.add(container).close();
        return new File(fileName);
    }

    private Cell getSessionInfo(List<Ticket> tickets) throws IOException {
        Session session = tickets.get(0).getSession();
        LocalDateTime startAt = session.getStartAt();

        Image logo = getImage(getLogoFromResource()).setHeight(150).setWidth(210);
        Paragraph title = getTitle(session.getFilm().getTitle());
        Paragraph dateParagraph = getParagraph("Date", startAt.format(DateTimeFormatter.ISO_DATE));
        Paragraph timeParagraph = getParagraph("Time", startAt.format(DateTimeFormatter.ofPattern("HH:mm")));
        Paragraph hallParagraph = getParagraph("Hall", "Hall №" + session.getHall().getNumber());
        return new Cell()
                .setBorder(Border.NO_BORDER)
                .add(logo)
                .add(title)
                .add(dateParagraph)
                .add(timeParagraph)
                .add(hallParagraph)
                .setBorderRight(new SolidBorder(WebColors.getRGBColor("#A09696"), 1));
    }

    private Paragraph getTitle(String title) throws IOException {
        PdfFont papyrusFont = PdfFontFactory.createFont(FONT_PATH);
        return new Paragraph(title)
                .setFont(papyrusFont)
                .setFontSize(TITLE_FONT_SIZE);
    }

    private Paragraph getParagraph(String label, String content) {
        TextAlignment center = TextAlignment.CENTER;
        Paragraph labelSpan = new Paragraph(label)
                .setTextAlignment(center)
                .setMultipliedLeading(Leading.FIXED)
                .setBold()
                .setPaddingLeft(LABEL_CONTAINER_PADDING_HORIZONTAL)
                .setPaddingRight(LABEL_CONTAINER_PADDING_HORIZONTAL)
                .setBackgroundColor(WebColors.getRGBColor(LABEL_CONTAINER_BACKGROUND_COLOR))
                .setRelativePosition(0, LABEL_CONTAINER_RELATIVE_POSITION_Y, 0, 0);
        Paragraph labelContainer = new Paragraph().add(labelSpan);
        Paragraph valueParagraph = new Paragraph(content)
                .setTextAlignment(center)
                .setRelativePosition(0, LABEL_CONTAINER_RELATIVE_POSITION_Y, 0, 0)
                .setFontSize(VALUE_FONT_SIZE);
        Div fullContainer = new Div()
                .setBorder(new SolidBorder(WebColors.getRGBColor("#A09696"), 2, 0.5f))
                .setBorderRadius(new BorderRadius(10))
                .setMarginTop(FULL_CONTAINER_MARGIN_TOP)
                .setPaddingLeft(FULL_CONTAINER_PADDING_HORIZONTAL)
                .setPaddingRight(FULL_CONTAINER_PADDING_HORIZONTAL)
                .add(labelContainer)
                .add(valueParagraph);

        return new Paragraph().add(fullContainer);
    }

    private Cell getAllTicketsInfo(List<Ticket> tickets, List<ByteArrayOutputStream> qrCodesBytesArray) {
        Table table = new Table(TABLE_COLUMNS)
                .setWidth(UnitValue.createPercentValue(100))
                .setMarginLeft(TABLE_MARGIN_LEFT);

        for (int i = 0; i < tickets.size(); i++) {
            Ticket ticket = tickets.get(i);
            Cell rowCell = getCellWithNoBorder("Row", ticket.getRow());
            Cell seatCell = getCellWithNoBorder("Seat", ticket.getSeat());
            Image qrCode = getImage(qrCodesBytesArray.get(i).toByteArray()).setHeight(QR_CODE_HEIGHT);
            Cell qrCodeCell = getCellWithNoBorder(qrCode);

            table.addCell(rowCell)
                    .addCell(seatCell)
                    .addCell(qrCodeCell);
        }
        return getCellWithNoBorder(table);
    }

    private Cell getCellWithNoBorder(String key, int value) {
        return getCellWithNoBorder(getParagraph(key, String.valueOf(value)));
    }

    private Cell getCellWithNoBorder(BlockElement<? extends IElement> element) {
        return new Cell()
                .add(element)
                .setBorder(Border.NO_BORDER);
    }

    private Cell getCellWithNoBorder(Image element) {
        return new Cell()
                .add(element)
                .setBorder(Border.NO_BORDER);
    }


    private Image getImage(byte[] content) {
        ImageData imageData = ImageDataFactory.create(content);
        return new Image(imageData);
    }

    private byte[] getLogoFromResource() throws IOException {
        Resource resource = new ClassPathResource(LOGO_RESOURCE_PATH);
        return resource.getContentAsByteArray();
    }
}
