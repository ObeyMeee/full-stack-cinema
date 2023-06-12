package ua.com.andromeda.common;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ua.com.andromeda.ticket.Ticket;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class EmailSender {
    @Value("${spring.mail.username}")
    private String from;

    private final JavaMailSender sender;
    private final TemplateEngine templateEngine;

    @SneakyThrows
    public void sendTicketsEmail(String to, List<Ticket> tickets, File fileToAttach) {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setFrom(from);
        String title = tickets.get(0).getSession().getFilm().getTitle();
        helper.setSubject("Your tickets of " + title);
        Map<String, Object> map = getVariables(to, tickets, title);
        String htmlContent = prepareHtml(map);
        Resource resource = new ClassPathResource("static/logo.png");
        System.out.println(resource.getFile());
        helper.setText(htmlContent, true);
        helper.addInline("logo", resource);
        helper.addAttachment("tickets.pdf", fileToAttach);
        sender.send(message);
    }

    private Map<String, Object> getVariables(String to, List<Ticket> tickets, String title) {
        Map<String, Object> map = new HashMap<>();
        map.put("username", to);
        map.put("title", title);
        map.put("tickets", tickets);
        return map;
    }

    private String prepareHtml(Map<String, Object> map) {
        Context context = new Context();
        context.setVariables(map);
        return templateEngine.process("tickets-purchase-mail", context);
    }
}
