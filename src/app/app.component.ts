import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  currentCard: HTMLElement | null = null;
  displayElement: HTMLElement | null = null;
  messages: string[] = ['Tab 1', 'Tab 2', 'Tab 3'];

  toggleCard() {
    const buttonContainer = document.getElementById('buttonContainer');
    const cardContainer = document.getElementById('cardContainer');

    if (this.currentCard) {
      this.hideCard(this.currentCard);
    } else {
      this.createCard(buttonContainer, cardContainer);
    }
  }

  createCard(buttonContainer: HTMLElement | null, cardContainer: HTMLElement | null) {
    if (!buttonContainer || !cardContainer) {
      return;
    }

    this.messages.forEach((messageText) => {
      const button = document.createElement('button');
      button.textContent = messageText;
      button.addEventListener('click', () => {
        this.showMessageClicked(messageText, button);
        button.classList.add('bts');
      });

      button.style.marginRight = '5px';
      button.style.padding = '10px';
      button.style.borderRadius = '4px';
      buttonContainer.appendChild(button);
    });

    this.currentCard = document.createElement('div');
    this.currentCard.classList.add('card');
    cardContainer.appendChild(this.currentCard);
  }

  hideCard(card: HTMLElement | null) {
    const buttonContainer = document.getElementById('buttonContainer');
    const cardContainer = document.getElementById('cardContainer');

    if (buttonContainer && cardContainer && card) {
      cardContainer.removeChild(card);
      buttonContainer.innerHTML = '';
      this.currentCard = null;
      this.displayElement = null;
    }
  }

  showMessageClicked(message: string, clickedButton: HTMLButtonElement) {
    const cardContainer = document.getElementById('cardContainer');

    if (cardContainer) {
      if (!this.currentCard) {
        this.currentCard = document.createElement('div');
        this.currentCard.classList.add('card');
        cardContainer.appendChild(this.currentCard);
      }

      if (!this.displayElement) {
        this.displayElement = document.createElement('p');
        this.currentCard.appendChild(this.displayElement);
      }

      this.messages.forEach((messageText) => {
        const button = Array.from(document.getElementsByTagName('button')).find(btn => btn.textContent === messageText);
        if (button) {
          button.classList.add('bts');
          button.classList.remove('highlighted');
          button.style.backgroundColor = '';
        }
      });

      clickedButton.classList.toggle('highlighted');
      clickedButton.style.backgroundColor = clickedButton.classList.contains('highlighted') ? 'salmon' : '';

      this.displayElement.classList.add('card-content');
      this.displayElement.textContent = `${message} is clicked`;
      this.displayElement.style.border = '1px solid';
      this.displayElement.style.borderRadius = '4px';
      this.displayElement.style.height = '100px';
      this.displayElement.style.width = '180px';
    }
  }
}
