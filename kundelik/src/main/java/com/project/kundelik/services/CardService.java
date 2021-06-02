package com.project.kundelik.services;

import com.project.kundelik.entities.CardTasks;
import com.project.kundelik.entities.Cards;

import java.util.List;

public interface CardService {

    Cards addCard(Cards card);
    List<Cards> getAllCards();
    Cards getCard(Long id);
    void deleteCard(Cards card);
    Cards saveCard(Cards card);
    List<Cards> getAllCardsByName(String name);


    CardTasks addCardTask(CardTasks cardTask);
    List<CardTasks> getAllCardTasks();
    CardTasks getCardTask(Long id);
    void deleteCardTask(CardTasks cardTask);
    CardTasks saveCardTask(CardTasks cardTask);
    List<CardTasks> findTasksByCard(Long card_id);
}
