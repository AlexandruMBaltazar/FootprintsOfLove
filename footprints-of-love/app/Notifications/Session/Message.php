<?php

namespace App\Notifications\Session;

use App\Models\Session;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Message extends Notification
{
    use Queueable;

    private Session\Message $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Session\Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'id' => $this->message->id,
            'session_id' => $this->message->session_id,
            'user_id' => $this->message->user->id,
            'first_name' => $this->message->user->first_name,
            'profile_photo_location' => $this->message->user->profilePhoto?->location,
            'message' => $this->message->message,
            'created_at' => $this->message->created_at,
            'type' => $this->broadcastType()
        ];
    }

    /**
     * Get the type of the notification being broadcast.
     *
     * @return string
     */
    public function broadcastType()
    {
        return 'notification.message';
    }
}
