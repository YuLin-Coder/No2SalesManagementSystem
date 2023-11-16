package com.storems.admin.action;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

@Controller
public class ImageAction {

    @RequestMapping("/image")
    public void image(HttpServletRequest request, HttpServletResponse response){
      try {
          String chose = "1234567890";
          char display[] = { '0', '0', '0', '0'}, temp;
          Random rand = new Random();
          for (int i = 0; i < 4; i++) {
              temp = chose.charAt(rand.nextInt(chose.length()));
              display[i] = temp;
          }
          request.getSession().setAttribute("vCode", String.valueOf(display));

          response.setContentType("image/png");
          response.addHeader("pragma", "NO-cache");
          response.addHeader("Cache-Control", "no-cache");
          response.addDateHeader("Expries", 0);
          int width = 70, height = 20;
          BufferedImage image = new BufferedImage(width, height,
                  BufferedImage.TYPE_INT_RGB);
          Graphics g = image.getGraphics();

          g.setColor(new Color(255, 255, 255));
          g.fillRect(0, 0, width, height);

          g.setColor(new Color(11, 39, 65));
          Font font = new Font("Arial", Font.BOLD, 14);
          g.setFont(font);

          for (int i = 0; i < 4; i++) {
              String s = display[i] + "";
              Random ran = new Random();
              int y = ran.nextInt(8);
              g.drawString(s, 14 * i + 2, 11 + y);
          }
          g.dispose();
          ServletOutputStream outStream = response.getOutputStream();
          JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(outStream);
          encoder.encode(image);
          outStream.close();
      }catch (Exception e){

      }

    }

}
